import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Members from './components/Members/Members'
import Register from './components/Register/Register';
import Login from './components/Login/Login';


function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/members_and_families' element={ <Members />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={ <Login />} />
        </Routes> 
      </Router>
    </>
  );
}

export default App;
