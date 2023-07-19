import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Navbar />
      <div className="headBoard">
        <span>Manage your health and family with happiness</span>
        <span>
          Do you want to kick out sickness and maintain good health and fitness?
        </span>
        <span>sign up and get access to pharmaceutical drugs</span>
        <Link to="./signin" className="signIn">
          sign in
        </Link>
      </div>
    </div>
  );
};

export default Header;
