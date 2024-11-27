// Logout.js
import React, { useEffect } from 'react';
import axios from 'axios';

const UserLogout = () => {
    useEffect(() => {
        const logoutUser = async () => {
            try {
                await axios.post('http://localhost:8080/users/logout/');
            } catch (error) {
                console.error('Failed to logout', error);
            }
        };
        logoutUser();
    }, []);

    return (
        <div>
            <h3>Você saiu da sua conta.</h3>
        </div>
    );
};

export default UserLogout;
