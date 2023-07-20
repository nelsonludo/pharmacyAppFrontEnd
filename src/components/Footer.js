import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <span> copyright &copy; pharmacy app</span>
    </StyledFooter>
  );
};

export default Footer;

const navyBlue = "#3c6579";
const specialorange = "#ff9100";

const StyledFooter = styled.footer`
  background-color: ${navyBlue};
  height: 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
