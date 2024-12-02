import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
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
