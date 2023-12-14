// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductManagement from './pages/ProductManagement';
import Dashboard from './pages/Dashboard';
// import axios from 'axios';

export const Backend_URL = 'http://localhost:8080'
// export const token = sessionStorage.getItem('token');
// export const instance = axios.create({
//   baseURL: 'http://localhost:8080', // Replace with your server's address
// });

function App() {
  return (
    <Routes>

      <Route exact path='/' element={<Dashboard />} />

      <Route path='/add-Product' element={<AddProduct/>} />

      <Route path='/edit-Product/:id' element={<EditProduct/>} />

      <Route path='/product-management' element={<ProductManagement />} />

    </Routes>
  );
}

export default App;
