import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Nav from './components/Navbar';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/homepage';
import Login from './pages/login';
import Registration from './pages/registration';
import Bloodrequest from './components/bloodrequest';
import Donateblood from './components/donateblood';
import Forgot from './pages/forgot';
import Contactus from './contactus';
import Footer from './pages/footpage';
import Previousdonations from './components/previousdonations';
import Edituser from './pages/edituser';
import Logout from './components/logout';
import axios from 'axios';
import Availabedonors from './components/availabedonors';
import Changepassword from './pages/changepasword';
import Needed from './components/needyusers';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Authenticate() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_APILINKS}/authentication`, { withCredentials: true })
      .then((res) => {
        setActive(true);
      })
      .catch((err) => {
        setActive(false);
      });
  }, []);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {!active ? (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path="*" element={<Navigate to="/"/>} />
          </>
        ) : (
          <>
            <Route path='/logout' element={<Logout />} />
            <Route path='/bloodrequest' element={<Bloodrequest />} />
            <Route path='/donateblood' element={<Donateblood />} />
            <Route path='/previousdonations' element={<Previousdonations />} />
            <Route path='/edituser' element={<Edituser />} />
            <Route path='/availabledonors' element={<Availabedonors/>}></Route>
            <Route path='/changepassword' element={<Changepassword/>}></Route>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/needyusers" element={<Needed/>}></Route>
          </>
        )}
        <Route path='/contact' element={<Contactus />} />
      </Routes>
      <Footer />
    </>
  );
}

root.render(
  <BrowserRouter>
    <Authenticate />
  </BrowserRouter>
);

reportWebVitals();
