import React, { useState } from 'react';
import axios from 'axios';

const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/users/login', formData);
            
            if(response.status === 200 && response.data.Token){
                localStorage.setItem('authToken', response.data.Token);
                setResponseMessage('Login efetuado com sucesso!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setResponseMessage('Erro ao realizar o login.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar com o servidor');
        }
    };

    return (
        <div className="user-account-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <div>
                    <label>Email:</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default UserLogin;
