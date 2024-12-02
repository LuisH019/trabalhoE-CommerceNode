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

    const handleAddItemToCart = async (idProduct) =>{
        const token = localStorage.getItem('authToken');
            
        if (!token) {
            setResponseMessage('Usuário não autenticado');
            return;
        }

        try {
            await axios.post(`http://127.0.0.1:8080/cart/addItem?id=${localStorage.getItem('idUser')}&idProduct=${idProduct}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            
        } catch (error) {
            setResponseMessage('Erro ao deletar produto');
        }
    }

    return (
        <div>
            <h3>Lista de Produtos</h3>
            {error && <p>{error}</p>}

            <div className="container">
                <div className="row mt-4">
                    {products.map((product) => (
                        <div className="col-md-6 mb-3" key={product.id}>
                            <div className='card p-3'>
                                <img src="https://cdn-icons-png.flaticon.com/512/16/16410.png" className="card-img-top w-75 mx-auto d-block" alt='' />

                                <div className='card-body'>
                                    <h5 className='card-title'>
                                        Nome: {product.name}
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

                                    {authenticated &&
                                        <button className='btn btn-primary btn-block mt-3' onClick={()=>handleAddItemToCart(product.idProduct)}>Adcionar ao carrinho</button>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
