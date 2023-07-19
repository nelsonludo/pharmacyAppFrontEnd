import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { loggedin } = useAuthContext();

  return (
    <div className="header">
      {loggedin ? (
        <div>
          <span>follow us on</span>
          <img alt="tweeter Image" />
          <img alt="facebook Image" />
          <img alt="instagram Image" />
          <img alt="tiktok Image" />
          <button>contact us</button>
        </div>
      ) : (
        <div>
          <span>follow us on</span>
          <img alt="tweeter Image" />
          <img alt="facebook Image" />
          <img alt="instagram Image" />
          <img alt="tiktok Image" />
          <button>contact us</button>
          <Link to="/login" className="login">
            Login
          </Link>
        </div>
      )}

      <div>
        <img alt="logo" />
        <SearchBar />
        <select name="categories"></select>
        <select name="AboutUs"></select>
        <select name="OurSevices"></select>
      </div>
    </div>
  );
};

export default Navbar;
