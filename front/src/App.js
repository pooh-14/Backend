// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import AddProduct from './Components/Seller/AddProduct';
import YourProducts from './Components/Seller/YourProduct';
import Navbar from './Components/Common/Navbar';
import Profile from './Components/Profile';
import SingleProduct from './Components/Buyer/SingleProduct';
import Cart from './Components/Buyer/Cart';

function App() {

  const { state } = useContext(AuthContext);
  console.log(state?.user, "- user")

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/addproduct' element={<AddProduct />} />
        <Route exact path='/yourproduct' element={<YourProducts />} />
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/singleproduct/:id' element={<SingleProduct/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;

