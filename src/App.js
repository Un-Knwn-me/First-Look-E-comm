// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductForm from './components.js/ProductForm';
import ProductList from './components.js/ProductList';
import axios from 'axios';
import AddProduct from './components.js/AddProduct';

// export const URL = 'http://localhost:8080'
// export const instance = axios.create({
//   baseURL: 'http://localhost:8080', // Replace with your server's address
// });

function App() {
  return (
    <Routes>

      <Route path='/' element={<AddProduct/>} />

      <Route exact path="/form" element={<ProductForm/>} />

      <Route path='/list' element={<ProductList />} />

    </Routes>
  );
}

export default App;
