import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ProductSearch = () => {
    const [formData, setFormData] = useState({
        idProduct:''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [product, setProduct] = useState(null);
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
                setProduct(null);
                setResponseMessage('Produto deletado com sucesso!');
            } else {
                setProduct(null);
                setResponseMessage('Produto não encontrado');
            }
        } catch (error) {
            setProduct(null);
            setResponseMessage('Erro ao deletar produto');
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
            const response = await axios.put(`http://127.0.0.1:8080/products/updateProduct?id=${formData.idProduct}`, product, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            if (response.data) {
                setProduct(response.data);
                setResponseMessage('Produto atualizado com sucesso!');
                setIsEditing(false);
            } else {
                setResponseMessage('Erro ao atualizar produto');
            }
        } catch (error) {
            setResponseMessage('Erro ao atualizar produto');
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
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
            {product && !isEditing && (
                <div>
                    <h4>Detalhes do Produto</h4> 
                    <p>ID: {product.idProduct}</p> 
                    <p>Nome: {product.name}</p> 
                    <p>Estoque: {product.stock}</p> 
                    <p>Preço: {product.price}</p>

                    <button type='button' className='btn btn-danger' onClick={handleDelete}>Apagar</button>
                    <button type='button' className='btn btn-warning' onClick={handleEdit}>Editar</button>
                </div>
            )}
            {product && isEditing && (
                <div>
                    <h4>Editar Produto</h4>
                    <form onSubmit={handleSaveEdit}>
                        <div className='form-group'>
                            <label>Nome do produto:</label>
                            <input
                                type='text'
                                name='name'
                                value={product.name}
                                onChange={handleEditChange}
                                className='form-control'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Estoque disponível:</label>
                            <input
                                type='number'
                                name='stock'
                                value={product.stock}
                                onChange={handleEditChange}
                                className='form-control'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Preço:</label>
                            <input
                                type='number'
                                name='price'
                                value={product.price}
                                onChange={handleEditChange}
                                className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Salvar</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductSearch;
