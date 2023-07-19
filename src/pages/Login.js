import React, { useState } from "react";
import styled from "styled-components";
import axios from "../axios/instance";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("customer");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { dispatch, setLoggedin, loggedin } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !title) {
      alert("please enter both email, password and title");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`/${title}/login`, {
        email,
        password,
      });

      localStorage.setItem("info", JSON.stringify(data.title));
      dispatch({ type: "SET_USER", payload: data });
      navigate("/");
      setLoggedin(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        >
          <option value={"customer"}>Customer</option>
          <option value={"cachier"}>Cachier</option>
          <option value={"pharmacyAdmin"}>Pharmacy Admin</option>
          <option value={"systemAdmin"}>System Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.section``;
