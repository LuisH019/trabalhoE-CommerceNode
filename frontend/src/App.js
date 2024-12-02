import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

import UserAccountForm from './UserAccountForm';
import UserLogin from './UserLogin';
import UserLogout from './UserLogout';
import UserList from './UserList';

import ProductDataForm from './ProductDataForm';
import ProductSearch from './ProductSearch';
import ProductList from './ProductList';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se o token está presente no localStorage quando o componente monta
    const token = localStorage.getItem('authToken');
    setAuthenticated(token !== null);
  }, []);

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {/* Bootstrap Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Loja Loja</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {authenticated ? (
              <>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('userList')}>Lista de usuários</button>
                </li>
                
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('productList')}>Lista de produtos</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('newProduct')}>Novo produto</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('searchProduct')}>Procurar produto</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('logout')}>Sair</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('createAccount')}>Criar conta</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('login')}>Login</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container text-center mt-5">
        {currentPage === 'landing' && (
          <div>
            <h1 className="display-4">Loja Loja</h1>
          </div>
        )}
        {currentPage === 'userList' && (
          <div className="mt-4">
            <UserList />
          </div>
        )}
        {currentPage === 'createAccount' && (
          <div className="mt-4">
            <UserAccountForm />
          </div>
        )}
        {currentPage === 'login' && (
          <div className="mt-4">
            <UserLogin />
          </div>
        )}
        {currentPage === 'logout' && (
          <div className="mt-4">
            <UserLogout />
          </div>
        )}
        {currentPage === 'productList' && (
          <div className="mt-4">
            <ProductList />
          </div>
        )}
        {currentPage === 'newProduct' && (
          <div className="mt-4">
            <ProductDataForm />
          </div>
        )}
        {currentPage === 'searchProduct' && (
          <div className="mt-4">
            <ProductSearch />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
