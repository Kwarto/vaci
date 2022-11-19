import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Members from './components/Members/Members';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './components/Add/Add';
import View from './components/view/View';

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="add" element={<Add />} />
          <Route path="/update/:id" element={<Add />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/members_and_families" element={<Members />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
