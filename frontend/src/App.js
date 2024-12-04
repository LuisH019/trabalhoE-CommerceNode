import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

import UserAccountForm from './user/UserAccountForm';
import UserLogin from './user/UserLogin';
import UserLogout from './user/UserLogout';
import UserList from './user/UserList';

import ProductDataForm from './product/ProductDataForm';
import ProductSearch from './product/ProductSearch';
import ProductList from './product/ProductList';

import SupplierDataForm from './supplier/SupplierDataForm';
import SupplierSearch from './supplier/SupplierSearch';
import SuppliersList from './supplier/SuppliersList';

import CartItemsList from './cart/CartItemsList';

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
        <button className="nav-link btn" onClick={() => handleNavClick('landing')}> 
          <h3>
            Loja Loja
          </h3>
        </button>
        {authenticated ? (
          <>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-3 align-items-center">
                <li className="nav-item">
                  <button className="nav-link btn dropdown-item" onClick={() => handleNavClick('userList')}>Lista de usuários</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('newProduct')}>Novo produto</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('searchProduct')}>Procurar produto</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn dropdown-item" onClick={() => handleNavClick('suppliersList')}>Lista de fornecedores</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('newSupplier')}>Novo fornecedor</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('searchSupplier')}>Procurar fornecedor</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('cartItemsList')}>Carrinho</button>
                </li>
              </ul>
            </div>

            <div className='navbar-text d-flex align-items-center'>
              <h5>
                Olá, {localStorage.getItem('username')}
              </h5>

              <button className="nav-link btn px-2" onClick={() => handleNavClick('logout')}>Sair</button>
            </div>
          </>
        ) : (
          <>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-3 align-items-center">
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('createAccount')}>Criar conta</button>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => handleNavClick('login')}>Login</button>
                </li>
              </ul>
            </div>
          </>
        )}
        
        
      </nav>

      {/* Main Content */}
      <div className="container d-flex text-center mt-5 justify-content-center">
        {currentPage === 'landing' && (
          <div>
            <h1 className="display-4">Loja Loja</h1>
            <ProductList/>
          </div>
        )}

        {currentPage === 'userList' && (
          <div className="mt-4">
            <UserList />
          </div>
        )}
        
        {currentPage === 'newProduct' && (
          <div className="mt-4 w-50 bg-light p-4 border rounded shadow-sm">
            <ProductDataForm />
          </div>
        )}

        {currentPage === 'searchProduct' && (
          <div className="mt-4 w-50 bg-light p-4 border rounded shadow-sm">
            <ProductSearch />
          </div>
        )}

        {currentPage === 'newSupplier' && (
          <div className="mt-4 w-50 bg-light p-4 border rounded shadow-sm">
            <SupplierDataForm />
          </div>
        )}

        {currentPage === 'searchSupplier' && (
          <div className="mt-4 w-50 bg-light p-4 border rounded shadow-sm">
            <SupplierSearch />
          </div>
        )}

        {currentPage === 'suppliersList' && (
          <div>
            <SuppliersList />
          </div>
        )}

        {currentPage === 'cartItemsList' && (
          <div>
            <CartItemsList />
          </div>
        )}

        {currentPage === 'logout' && (
          <div className="mt-4">
            <UserLogout />
          </div>
        )}

        {currentPage === 'createAccount' && (
          <div className="mt-4 w-50 bg-light p-4 border rounded shadow-sm">
            <UserAccountForm />
          </div>
        )}
        {currentPage === 'login' && (
          <div className="mt-4 w-50 bg-light p-4 border rounded shadow-sm">
            <UserLogin />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
