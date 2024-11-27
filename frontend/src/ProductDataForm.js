import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ProductDataForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        produto: '',
        categoria: '',
        preco: ''
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
        try {
            const response = await axios.post('/api/products', formData);
            setResponseMessage(response.data.message);
            handleClear();
        } catch (error) {
            setResponseMessage('Erro ao salvar o produto');
        }
    };

    const handleClear = () => {
        setFormData({
            id: '',
            produto: '',
            categoria: '',
            preco: ''
        });
        setResponseMessage('');
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/products/${formData.id}`);
            setFormData(response.data);
            setResponseMessage('');
        } catch (error) {
            setResponseMessage('Produto não encontrado');
        }
    };

    return (
        <div className='user-account-form'>
            <h3>Cadastro de Produtos</h3>
            <form onSubmit={handleSave}>
                <div className='form-group'>
                    <label>ID:</label>
                    <input
                        type='text'
                        name='id'
                        value={formData.id}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Produto:</label>
                    <input
                        type='text'
                        name='produto'
                        value={formData.produto}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Categoria:</label>
                    <input
                        type='text'
                        name='categoria'
                        value={formData.categoria}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Preço:</label>
                    <input
                        type='text'
                        name='preco'
                        value={formData.preco}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary'onClick={handleSave}>Salvar</button>
                <button type='button' className='btn btn-secondary' onClick={handleClear}>Limpar</button>
                <button type='button' className='btn btn-info' onClick={handleSearch}>Buscar</button>
            </form>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
        </div>
    );
};

export default ProductDataForm;