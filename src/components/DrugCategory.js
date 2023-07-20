import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DrugCategory = ({ category }) => {
  return (
    <AllCategoriesOfDrugs>
      {category.map((item) => (
        <StyledLink
          key={item.id}
          className="categoryContainer"
          to={"/product"}
          state={{ name: "", category: item.id }}
        >
          <SubCategoryContainer1>
            <Img alt="aCategory" src={item.imageUrl} />
          </SubCategoryContainer1>
          <SubCategoryContainer2>
            <span className="categoryName">{item.name}</span>
            <span className="categoryDescription">{item.description}</span>
          </SubCategoryContainer2>
        </StyledLink>
      ))}
    </AllCategoriesOfDrugs>
  );
};

export default DrugCategory;

const navyBlue = "#3c6579";
const specialorange = "#ff9100";

const Img = styled.img`
  width: 90px;
  height: 70px;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0.5px 0.5px 5px 0.5px lightgrey;
  text-decoration: none;
  color: ${navyBlue};
`;

const SubCategoryContainer1 = styled.div`
  height: 40%;
  border-bottom: 1px solid lightgrey;
  display: flex;
  justify-content: center;
  padding: 2px 0;
`;
const SubCategoryContainer2 = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 40px 0;

  .categoryName {
    font-size: 165%;
    font-weight: bold;
    margin: 5%;
  }
`;

const AllCategoriesOfDrugs = styled.div`
  width: 90%;
  position: absolute;
  top: 570px;
  left: 0;
  display: grid;
  gap: 100px;
  grid-template-columns: auto auto auto;
  padding: 0 0 0 5%;
`;
