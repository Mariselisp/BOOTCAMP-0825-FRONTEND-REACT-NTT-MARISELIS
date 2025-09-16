import React, { useEffect, useState } from 'react';
import { searchProducts } from '../../proxy/SearchProducts/SearchProducts';
import './Navbar.css';
import { useProductContext } from '../../context/ProductContext';
import { getAllProducts } from '../../proxy/Products/GetAllProducts';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { setProducts } = useProductContext();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 2) {
      try {
        const products = await searchProducts(value);
        const productsJson = await products.json();
        setProducts(productsJson.products);
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }
    }
    else{
      try{
        const products = await getAllProducts();
        const productsJson = await products.json();
        setProducts(productsJson.products);
      } catch(error){
        console.error('Error al buscar productos:', error);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('isAuthenticated');
    navigate('/Login');
  };

  return (
    <div className='barrasuperior'>
      <div className='barrasuperior-img'>
        <img src="/images/marketplace.png" alt="marketplace" />
      </div>
      <div className="search">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar productos..."
        />
        <div className="button-search">
          <button></button>
          <img src="/images/search_17450802.png" alt="lupa" />
        </div>
      </div>
      <div>
        <img src="/images/empty-cart.png" alt="shopping-car" />
      </div>
      <div className='usuario'>
        <div className='usuario-saludo' onClick={() => setShowLogout(!showLogout)}>
          <h2>Hola, {username ?? 'invitado'}</h2>
        </div>
        {showLogout && (
          <div className='logout-menu'>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </div>
  );
};