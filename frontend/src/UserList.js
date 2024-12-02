import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('authToken');
            
            if (!token) {
                setError('Usuário não autenticado');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/users/allusers', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                setError('Falha ao buscar usuários.');
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h3>Lista de Usuários</h3>
            {error && <p>{error}</p>}

            <div className="container">
                <div className="row mt-4">
                    {users.map((user) => (
                        <div className="col-md-6 mb-3" key={user.id}>
                            <div className='card p-3'>
                                <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" className="card-img-top w-75 mx-auto d-block" alt='' />

                                <div className='card-body'>
                                    <h5 className='card-title'>
                                        ID: {user.id}
                                    </h5>
                                    <h6 className='card-subtitle mb-2 text-muted'>
                                        Email: {user.email}
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

export default UserList;
