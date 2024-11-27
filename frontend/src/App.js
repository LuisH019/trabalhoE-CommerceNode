import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

import UserAccountForm from './UserAccountForm';
import UserLogin from './UserLogin';
import UserLogout from './UserLogout';
import UserList from './UserList';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

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
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('userList')}>Lista de Usuários</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('createAccount')}>Criar conta</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('login')}>Login</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavClick('logout')}>Sair</button>
            </li>
            
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
            <UserList/>
          </div>
        )}
        {currentPage === 'createAccount' && (
          <div className="mt-4">
            <UserAccountForm/>
          </div>
        )}

        {currentPage === 'login' && (
          <div className="mt-4">
            <UserLogin/>
          </div>
        )}

        {currentPage === 'logout' && (
          <div className="mt-4">
            <UserLogout/>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;
