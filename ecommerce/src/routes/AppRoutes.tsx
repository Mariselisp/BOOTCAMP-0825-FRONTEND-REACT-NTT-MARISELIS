import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import {Home} from '../pages/Home/Home';
import ProtectedRoute from './ProtectedRoute';
import { ProductProvider } from '../context/ProductContext';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<ProductProvider><ProtectedRoute><Home /></ProtectedRoute></ProductProvider>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;