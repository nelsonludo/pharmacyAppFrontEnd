import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import axios from "../axios/instance";

const Home = () => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post(
      `/${user.title}/logout`,
      {},
      {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      }
    );
    localStorage.removeItem("info");
    dispatch({ type: "UNSET_USER" });
    navigate("/login");
  };

  return (
    <Wrapper>
      <h1>Home page</h1>
      <div className="header">
        <div>
          <span>follow us on</span>
          <img alt="tweeter Image" />
          <img alt="facebook Image" />
          <img alt="instagram Image" />
          <img alt="tiktok Image" />
          <button>contact us</button>
          <link src="/login" className="login">
            Login
          </link>
        </div>
        <div>
          <img alt="logo" />
          <input type="text" value={"search drug here"} />
          <img alt="seach Image" />
          <select name="categories"></select>
          <select name="AboutUs"></select>
          <select name="OurSevices"></select>
        </div>
      </div>
      <div className="headBoard">
        <span>Manage your health and family with happiness</span>
        <span>
          Do you want to kick out sickness and maintain good health and fitness?
        </span>
        <span>sign up and get access to pharmaceutical drugs</span>
        <link to="/signin" className="signIn">
          sign in
        </link>
      </div>
      <div className="allCategoriesOfDrugs">
        <div className="categoryLine">
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
        </div>
        <div className="categoryLine">
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
        </div>
        <div className="categoryLine">
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
        </div>
        <div className="categoryLine">
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
          <div className="categoryContainer">
            <div className="subCategoryContainer1">
              <img alt="a category" />
            </div>
            <div className="subCategoryContainer2">
              <span className="categoryName">stimulants</span>
              <span className="categoryDescription">long borring text</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <span> copyright &copy; pharmacy app</span>
      </div>
      {/* {user && user.email ? <h2>{user.email}</h2> : <h2>Not logged in</h2>}
      {user && user.email && <button onClick={logout}>Logout</button>} */}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section``;
