import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserLogout = () => {
    const [error, setError] = useState('');

    useEffect(() => {
        const logoutUser = async () => {
            try {
                localStorage.removeItem('authToken');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            } catch (error) {
                setError('Falha ao realizar logout');
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
