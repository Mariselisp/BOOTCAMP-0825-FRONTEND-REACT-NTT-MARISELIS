import { createContext, useContext, useState } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  sku: string;
  images: string[];
};

type ProductContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProductContext debe usarse dentro de ProductProvider');
  return context;
};