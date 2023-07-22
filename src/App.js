import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import Signup from './pages/Signup';
import SystemAdmin from './pages/SystemAdmin';
import Unauthorized from './pages/Unauthorized';
import ProtectSystemAdmin from './components/ProtectRoutes/ProtectSystemAdmin';
import SystemAdminPharmacies from './components/SystemAdmin/SystemAdminPharmacies';
import SystemAdminDrugs from './components/SystemAdmin/SystemAdminDrugs';
import Loading from './components/Loading';

function App() {
  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        {/* GENERAL ROUTES */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        {/* SYSTEM ADMIN ROUTES */}
        <Route
          path='/systemAdmin'
          element={
            <ProtectSystemAdmin>
              <SystemAdmin />
            </ProtectSystemAdmin>
          }
        >
          <Route path='pharmacies' element={<SystemAdminPharmacies />} />
          <Route path='drugs' element={<SystemAdminDrugs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//todo
//npm install react-router-dom axios styled-components react-icons @emotion/react emotion/styled mui/material

// then setup usereducer and usecontext (make sure they're accessible everywhere)
// create an authcontext and it's reducer function which stores user info
// create all login pages (system admin, pharmacy admin, cashier and customer)
// create a sign up page just for customer
// create a home page (you can put click to sign in)
