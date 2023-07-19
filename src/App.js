import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Products />} />
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
