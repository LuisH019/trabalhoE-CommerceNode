import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setAuthenticated(token !== null);

        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/suppliers/');
                setSuppliers(response.data);
            } catch (error) {
                setError('Falha ao buscar os fornecedores.');
            }
        };
        fetchSuppliers();
    }, []);

    return (
        <div>
            <h3>Lista de Fornecedores</h3>
            {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
            {error && <p>{error}</p>}

            <div className="container">
                <div className="row mt-4">
                    {suppliers.map((supplier) => (
                        <div className="col-md-4 mb-3" key={supplier.id}>
                            <div className='card p-3 h-100 text-center'>
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SupplierList;
