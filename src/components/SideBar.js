import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideBar = ({ category }) => {
  return (
    <AllCategoriesOfDrugs>
      {category.map((item) => (
        <StyledLink
          key={item.id}
          className="categoryContainer"
          to={"/products"}
          state={{ name: "", category: item.id }}
        >
          <h3 className="categoryName">{item.name}</h3>
          <span className="categoryDescription">{item.description}</span>
        </StyledLink>
      ))}
    </AllCategoriesOfDrugs>
  );
};

export default SideBar;

const navyBlue = "#3c6579";
const specialorange = "#ff9100";

const Img = styled.img`
  width: 100%;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  text-decoration: none;

  span {
    color: darkgrey;
  }

  h3 {
    color: ${navyBlue};
  }
`;

const AllCategoriesOfDrugs = styled.div`
  width: 20%;
  padding: 15px 2%;
  box-shadow: 0.5px 0.5px 5px 0.5px lightgrey;
  border-radius: 0 10px 0 0;
`;
