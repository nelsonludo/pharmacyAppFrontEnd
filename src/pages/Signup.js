import React, { useState } from "react";
import styled from "styled-components";
import axios from "../axios/instance";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Loading from "../components/Loading";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("customer");

  const navigate = useNavigate();
  const { setLoading } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !title || !userName) {
      alert("please enter both email, password and title");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`/customer/`, {
        email,
        password,
        name: userName,
      });
      console.log(data);
      navigate("/");
      // login the user axios.post(`/customer/login`
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Loading />
      <div className="mainContainer">
        <div className="signupHead">
          <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="secondContainer">
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="secondContainer">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="secondContainer">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Signup;

const navyBlue = "#3c6579";
const specialorange = "#ff9100";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 10% 0 0 0;

  .mainContainer {
    width: 45%;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-self: center;
    box-shadow: 0.5px 0.5px 5px 0.5px lightgrey;
  }

  .signupHead {
    background-color: ${navyBlue};
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    border-radius: 30px 30px 0 0;
  }

  form {
    padding: 5%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${navyBlue};
    border-radius: 0 0 30px 30px;
  }

  input,
  select {
    border: 1px solid ${navyBlue};
    padding: 5px;
    width: 90%;
    border-radius: 5px;
    margin: 5px;
    color: ${navyBlue};
  }

  .i {
    width: 93%;
  }

  input:focus,
  select:focus {
    outline: none;
  }

  button {
    width: 75%;
    background-color: ${specialorange};
    color: white;
    border-radius: 5px;
    margin: 10px 4% 10px 0px;
    border: none;
    padding: 5px;
  }

  label {
    margin-left: 5px;
  }
  .secondContainer {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
`;
