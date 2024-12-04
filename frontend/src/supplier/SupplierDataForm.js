import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const SupplierDataForm = () => {
    const [formData, setFormData] = useState({
        name: ''
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
            const response = await axios.post('http://127.0.0.1:8080/suppliers/newSupplier/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            setResponseMessage('Fornecedor salvo com sucesso');
        } catch (error) {
            setResponseMessage('Erro ao salvar o fornecedor');
        }
    };

    return (
        <div className='user-account-form'>
            <h3>Cadastro de Fornecedores</h3>
            <form onSubmit={handleSave}>
                <div className='text-start'>
                    <div className='form-group'>
                        <label>Nome do fornecedor:</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                </div>
                <button type='submit' className='btn btn-primary btn-block mt-3'onClick={handleSave}>Salvar</button>
            </form>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
        </div>
    );
};

export default SupplierDataForm;