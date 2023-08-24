// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
