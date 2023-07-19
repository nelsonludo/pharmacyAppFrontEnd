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

const Img = styled.img`
  width: 100%;
`;

const StyledLink = styled(Link)`
  width: 15%;
  display: flex;
  flex-direction: column;
`;

const SubCategoryContainer1 = styled.div`
  width: 50%;
`;
const SubCategoryContainer2 = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const AllCategoriesOfDrugs = styled.div`
  width: 100%;
`;
