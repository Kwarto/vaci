import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Members from './components/Members/Members';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './components/Add/Add';
import View from './components/view/View';
import Search from './components/Search/Search';
import Upload from './components/Upload/Upload';
import { auth } from './firebase';
import AddGroup from './components/Group/AddGroup';
import ViewGroup from './components/view/ViewGroup';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <>
      <ToastContainer position="top-center" />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}  />
          <Route path="/add" element={<Add /> } />
          <Route path="/add_group" element={<AddGroup />} />
          <Route path="/update/:id" element={ <Add /> } />
          <Route path="/view/:id" element={ <View /> } />
          <Route path="/group/:id" element={<ViewGroup /> } />
          <Route path="/members_and_families" element={user?.uid ? <Members user={user} /> : <Navigate to='/login' />} />
          <Route path="/search" element={<Search />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
