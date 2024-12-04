import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartItemsList = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            setResponseMessage('Usuário não autenticado');
            return;
        }

        const fetchCartItems = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8080/cart/?idUser=${localStorage.getItem('idUser')}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setCartItems(response.data);
            } catch (error) {
                setError('Falha ao buscar os produtos do carrinho.');
            }
        };
        fetchCartItems();
    }, []);

    const handleRemoveItem = async (idProduct) => {
        const token = localStorage.getItem('authToken');
            
        if (!token) {
            setResponseMessage('Usuário não autenticado');
            return;
        }

        try {
            const response = await axios.delete(`http://127.0.0.1:8080/cart/removeItem/?idUser=${localStorage.getItem('idUser')}&idProduct=${idProduct}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }});
            if (response.data) {
                setResponseMessage('Item removido com sucesso!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setResponseMessage('Item não encontrado');
            }
        } catch (error) {
            setResponseMessage('Erro ao remover item');
        }
    };

    return (
        <div>
            <h3>Lista de Produtos no Carrinho</h3>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
            {error && <p>{error}</p>}

            <div className="container">
                <div className="row mt-4">
                    {cartItems.map((cartItem) => (
                        <div className="col-md-4 mb-3" key={cartItem.id}>
                            <div className='card p-3 h-100 text-center'>
                                <img src="https://cdn-icons-png.flaticon.com/512/16/16410.png" className="card-img-top w-75 mx-auto d-block" alt='' />

                                <div className='card-body'>
                                    <h5 className='card-title'>
                                        {cartItem.nameProduct}
                                    </h5>
                                    <h6 className='card-subtitle mb-2 text-muted'>
                                        Quantidade: {cartItem.quantity}
                                    </h6>
                                    <h6 className='card-subtitle mb-2 text-muted'>
                                        Total do Produto: {cartItem.partialTotalCost}
                                    </h6>
                                    <button className='btn btn-danger btn-block mt-3' onClick={() => handleRemoveItem(cartItem.idProduct)}>Remover do carrinho</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CartItemsList;
