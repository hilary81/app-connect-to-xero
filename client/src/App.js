import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login  from './components/Login';
import Register from './components/Register';
import Dashboarlayout from './components/DashboardLayout';
import Payment from './components/Payment';

function App() {
  return (
     <BrowserRouter>
        <Routes>
          <Route path='/' element ={<Login/>}></Route>
          <Route path='/register' element ={<Register/>}></Route>
          <Route path='/payment' element ={<Payment/>}></Route>
          <Route path='/dashboard' element ={<Dashboarlayout/>}></Route>
        </Routes>
     </BrowserRouter>
  );
}

export default App;
