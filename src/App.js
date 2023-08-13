// General Imports
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import Signup from './pages/Signup';
import SystemAdmin from './pages/SystemAdmin';
import PharmacyAdmin from './pages/PharmacyAdmin';
import Unauthorized from './pages/Unauthorized';

// Components Imports
import ProtectSystemAdmin from './components/ProtectRoutes/ProtectSystemAdmin';
import ProtectPharmacyAdmin from './components/ProtectRoutes/ProtectPharmacyAdmin';
import ProtectCashier from './components/ProtectRoutes/ProtectCashier';
import SystemAdminPharmacies from './components/SystemAdmin/SystemAdminPharmacies';
import SystemAdminDrugs from './components/SystemAdmin/SystemAdminDrugs';
import Loading from './components/Loading';
import PharmacyAdminProducts from './components/PharmacyAdmin/PharmacyAdminProducts';
import PharmacyAdminCashiers from './components/PharmacyAdmin/PharmacyAdminCashiers';
import Cart from './pages/Cart';

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
        <Route path='/cart' element={<Cart />} />
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

        {/* PHARMACY ADMIN ROUTES */}
        <Route
          path='pharmacyAdmin'
          element={
            <ProtectPharmacyAdmin>
              <PharmacyAdmin />
            </ProtectPharmacyAdmin>
          }
        >
          <Route path='products' element={<PharmacyAdminProducts />} />
          <Route path='cashiers' element={<PharmacyAdminCashiers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Refactor axios to use the custome axios hook.
// Refactor all the global stuff to use useReducer.
