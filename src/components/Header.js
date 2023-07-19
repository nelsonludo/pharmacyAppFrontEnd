import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { loggedin } = useAuthContext();

  return (
    <div>
      <Navbar />
      {loggedin ? (
        <div className="headBoard">
          <span>Manage your health and family with happiness</span>
          <span>
            Do you want to kick out sickness and maintain good health and
            fitness?
          </span>
          <span>sign up and get access to pharmaceutical drugs</span>
        </div>
      ) : (
        <div className="headBoard">
          <span>Manage your health and family with happiness</span>
          <span>
            Do you want to kick out sickness and maintain good health and
            fitness?
          </span>
          <span>sign up and get access to pharmaceutical drugs</span>
          <Link to="./signup" className="signUp">
            sign up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
