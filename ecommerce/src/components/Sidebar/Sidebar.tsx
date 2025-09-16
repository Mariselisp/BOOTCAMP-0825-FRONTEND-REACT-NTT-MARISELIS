// src/components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import './Sidevar.css';
import { getAllCategories } from '../../proxy/Categories/GetAllCategories';
import { useProductContext } from '../../context/ProductContext';
import { getAllProducts } from '../../proxy/Products/GetAllProducts';

export const Sidebar: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { setProducts } = useProductContext();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setSelectedCategories((prev) =>
      isChecked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        // Si seleccionas una sola categoría, puedes usar directamente la URL
        const category = selectedCategories[0];
        const response = await fetch(`https://dummyjson.com/products/category/${category}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error al filtrar productos:', error);
      }
    };

    const fetchAllProducts = async () => {
      try{
        const products = await getAllProducts();
        const productsJson = await products.json();
        setProducts(productsJson.products);
      }
      catch(error){
        console.error('Error al filtrar productos:', error)
      }
    }

    if (selectedCategories.length > 0) {
      fetchFilteredProducts();
    }

    if(selectedCategories.length == 0){
      fetchAllProducts();
    }

  }, [selectedCategories, setProducts]);

  return (
    <div className='barraLateral'>
      <ul className='lista'>
        <h2>Categorías</h2>
        {categories.map((category, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                value={category}
                onChange={handleCheckboxChange}
                checked={selectedCategories.includes(category)}
              />
              {category}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};