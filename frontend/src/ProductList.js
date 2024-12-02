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
            <ul>
                {products.map(product => (
                    <div>
                        <h4>Detalhes do Produto</h4> 
                        <p>ID: {product.idProduct}</p> 
                        <p>Nome: {product.name}</p> 
                        <p>Estoque: {product.stock}</p> 
                        <p>Preço: {product.price}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
