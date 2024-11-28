import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ProductSearch = () => {
    const [formData, setFormData] = useState({
        idProduct:''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [product, setProduct] = useState(null); // Alterar para armazenar um único produto

    // Tratar o evento change dos campos do form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/products/getProductById?id=${formData.idProduct}`);
            if (response.data) {
                setProduct(response.data);
                setResponseMessage('Produto encontrado com sucesso!');
            } else {
                setProduct(null);
                setResponseMessage('Produto não encontrado');
            }
        } catch (error) {
            setProduct(null);
            setResponseMessage('Erro ao buscar produto');
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('authToken');
            
        if (!token) {
            setResponseMessage('Usuário não autenticado');
            return;
        }

        try {
            const response = await axios.delete(`http://127.0.0.1:8080/products/deleteProduct?id=${formData.idProduct}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            if (response.data) {
                setProduct(response.data);
                setResponseMessage('Produto deletado com sucesso!');
            } else {
                setProduct(null);
                setResponseMessage('Produto não encontrado');
            }
        } catch (error) {
            setProduct(null);
            setResponseMessage('Erro ao buscar produto');
        }
    };

    return (
        <div className='product-account-form'>
            <h3>Cadastro de Produtos</h3>
            <form onSubmit={e => e.preventDefault()}>
                <div className='form-group'>
                    <label>ID do produto:</label>
                    <input
                        type='number'
                        name='idProduct'
                        value={formData.idProduct}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <button type='button' className='btn btn-info' onClick={handleSearch}>Buscar</button>
            </form>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
            {product && (
                <div>
                    <h4>Detalhes do Produto</h4> 
                    <p>ID: {product.idProduct}</p> 
                    <p>Nome: {product.name}</p> 
                    <p>Estoque: {product.stock}</p> 
                    <p>Preço: {product.price}</p>

                    <button type='button' className='btn btn-danger' onClick={handleDelete}>Apagar</button>
                </div>

                
            )}
        </div>
    );
};

export default ProductSearch;
