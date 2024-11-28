// Logout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserLogout = () => {
    const [error, setError] = useState('');

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const token = localStorage.getItem('authToken');
            
                if (!token) {
                    setError('Usuário não autenticado');
                    return;
                }
                
                await axios.post('http://localhost:8080/users/logout/');
                
            } catch (error) {
                console.error('Failed to logout', error);
            }
        };
        logoutUser();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            <h3>Você saiu da sua conta.</h3>
        </div>
    );
};

export default UserLogout;
