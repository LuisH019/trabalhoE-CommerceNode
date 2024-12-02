import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ProductDataForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        stock: '',
        price: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    // Tratar o evento change dos campos do form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Tratar o salvar dados
    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
            
        if (!token) {
            setResponseMessage('Usuário não autenticado');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8080/products/newProduct/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            setResponseMessage('Produto salvo com sucesso');
        } catch (error) {
            setResponseMessage('Erro ao salvar o produto');
        }
    };

    return (
        <div className='user-account-form'>
            <h3>Cadastro de Produtos</h3>
            <form onSubmit={handleSave}>
                <div className='form-group'>
                    <label>Nome do produto:</label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Estoque disponível:</label>
                    <input
                        type='number'
                        name='stock'
                        value={formData.stock}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Preço:</label>
                    <input
                        type='number'
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary btn-block mt-3'onClick={handleSave}>Salvar</button>
            </form>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
        </div>
    );
};

export default ProductDataForm;