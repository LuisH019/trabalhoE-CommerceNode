import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const SupplierSearch = () => {
    const [formData, setFormData] = useState({
        idSupplier:''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [supplier, setSupplier] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar a edição

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8080/suppliers/getSupplierById?id=${formData.idSupplier}`);
            if (response.data) {
                setSupplier(response.data);
                setResponseMessage('Fornecedor encontrado com sucesso!');
            } else {
                setSupplier(null);
                setResponseMessage('Fornecedor não encontrado');
            }
        } catch (error) {
            setSupplier(null);
            setResponseMessage('Erro ao buscar fornecedor');
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('authToken');
            
        if (!token) {
            setResponseMessage('Usuário não autenticado');
            return;
        }

        try {
            const response = await axios.delete(`http://127.0.0.1:8080/suppliers/deleteSupplier?id=${formData.idSupplier}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            if (response.data) {
                setSupplier(null);
                setResponseMessage('Fornecedor deletado com sucesso!');
            } else {
                setSupplier(null);
                setResponseMessage('Fornecedor não encontrado');
            }
        } catch (error) {
            setSupplier(null);
            setResponseMessage('Erro ao deletar fornecedor');
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
            
        if (!token) {
            setResponseMessage('Usuário não autenticado');
            return;
        }

        try {
            const response = await axios.put(`http://127.0.0.1:8080/suppliers/updateSupplier?id=${formData.idSupplier}`, supplier, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            if (response.data) {
                setSupplier(response.data);
                setResponseMessage('Fornecedor atualizado com sucesso!');
                setIsEditing(false);
            } else {
                setResponseMessage('Erro ao atualizar fornecedor');
            }
        } catch (error) {
            setResponseMessage('Erro ao atualizar fornecedor');
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSupplier({
            ...supplier,
            [name]: value,
        });
    };

    return (
        <div className='supplier-account-form'>
            <h3>Procura de Fornecedor</h3>
            <form onSubmit={e => e.preventDefault()}>
                <div className='form-group text-start'>
                    <label>ID do fornecedor:</label>
                    <input
                        type='number'
                        name='idSupplier'
                        value={formData.idSupplier}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <button type='button' className='btn btn-info btn-block mt-3' onClick={handleSearch}>Buscar</button>
            </form>
            
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}

            {supplier && !isEditing && (
                <div className='d-flex flex-column align-items-center'>
                    <div className="col-6" key={supplier.id}>
                        <div className='card p-3'>
                            <img src="https://cdn-icons-png.flaticon.com/512/16/16410.png" className="card-img-top w-75 mx-auto d-block" alt='' />

                            <div className='card-body'>
                                <h5 className='card-title'>
                                    {supplier.name}
                                </h5>
                                <h6 className='card-subtitle mb-2 text-muted'>
                                    ID: {supplier.idSupplier}
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className='mt-3'>
                        <button type='button' className='btn btn-danger mx-2' onClick={handleDelete}>Apagar</button>
                        <button type='button' className='btn btn-warning mx-2' onClick={handleEdit}>Editar</button>
                    </div>
                </div>
            )}
            {supplier && isEditing && (
                <div>
                    <h4>Editar Fornecedor</h4>
                    <form onSubmit={handleSaveEdit}>
                        <div className='text-start'>
                            <div className='form-group'>
                                <label>Nome do fornecedor:</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={supplier.name}
                                    onChange={handleEditChange}
                                    className='form-control'
                                />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary btn-block mt-3'>Salvar</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SupplierSearch;
