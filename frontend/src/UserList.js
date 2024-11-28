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
            <ul>
                {users.map(user => (
                    <li key={user.idUser}>{user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
