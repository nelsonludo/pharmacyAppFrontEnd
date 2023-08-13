import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import DrugCategory from '../components/DrugCategory';
import Footer from '../components/Footer';
import { useGlobalContext } from '../contexts/GlobalContext';

const Home = () => {
  const { categories } = useGlobalContext();
  // const navigate = useNavigate();

  // const logout = async () => {
  //   await axios.post(
  //     `/${user.title}/logout`,
  //     {},
  //     {
  //       headers: {
  //         Authorization: "Bearer " + user.accessToken,
  //       },
  //     }
  //   );

  //   localStorage.removeItem("info");
  //   dispatch({ type: "UNSET_USER" });
  //   navigate("/");
  // };

  return (
    <Wrapper>
      <Header />
      <DrugCategory categories={categories} />
      <Footer />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section`
  // position: relative;

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto auto;
`;
