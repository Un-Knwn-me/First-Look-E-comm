// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Demo from './components/Demo';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductManagement from './pages/ProductManagement';
import Dashboard from './pages/Dashboard';
// import axios from 'axios';

// export const URL = 'http://localhost:8080'
// export const instance = axios.create({
//   baseURL: 'http://localhost:8080', // Replace with your server's address
// });

function App() {
  return (
    <Routes>

      <Route exact path='/' element={<Dashboard />} />

      <Route path='/add-Product' element={<AddProduct/>} />

      <Route path='/edit-Product' element={<EditProduct/>} />

      <Route path='/product-management' element={<ProductManagement />} />

      <Route path="/form" element={<Demo/>} />

      <Route path='/list' element={<ProductList />} />

    </Routes>
  );
}

export default App;
