import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setAuthenticated(token !== null);

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products/');
                setProducts(response.data);
            } catch (error) {
                setError('Falha ao buscar os produtos.');
            }
        };
        fetchProducts();
    }, []);

    const handleAddItemToCart = async (idProduct) => {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            setResponseMessage('Usuário não autenticado');
            return;
        }

        try {
            const response = await axios.post(
                `http://127.0.0.1:8080/cart/addItem/?idUser=${localStorage.getItem('idUser')}&idProduct=${idProduct}`,
                {},
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }
            );
            
            if (response.status === 200) {
                setResponseMessage('Produto adicionado ao carrinho com sucesso!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setResponseMessage('Erro ao adicionar produto ao carrinho.');
            }
        } catch (error) {
            setResponseMessage('Erro ao adicionar produto ao carrinho.');
        }
    };

    return (
        <div>
            <h3>Lista de Produtos</h3>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
            {error && <p>{error}</p>}

            <div className="container">
                <div className="row mt-4">
                    {products.map((product) => (
                        <div className="col-md-4 mb-3" key={product.id}>
                            <div className='card p-3 h-100 text-center'>
                                <img src="https://cdn-icons-png.flaticon.com/512/16/16410.png" className="card-img-top w-75 mx-auto d-block" alt='' />

                                <div className='card-body'>
                                    <h5 className='card-title'>
                                        {product.name}
                                    </h5>
                                    <h6 className='card-subtitle mb-2 text-muted'>
                                        ID: {product.idProduct}
                                    </h6>
                                    <h6 className='card-subtitle mb-2 text-muted'>
                                        Preço: {product.price}
                                    </h6>
                                    <h6 className='card-subtitle mb-2 text-muted'>
                                        Estoque: {product.stock}
                                    </h6>
                                </div>
                                {authenticated && product.stock !== 0 &&
                                    <button className='btn btn-primary btn-block mt-3' onClick={() => handleAddItemToCart(product.idProduct)}>Adicionar ao carrinho</button>
                                }

                                {authenticated && product.stock === 0 &&
                                    <div className='mt-3 rounded bg-danger text-white btn'>Produto indisponível</div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
