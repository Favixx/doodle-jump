import React from "react";
import { ScreenContainer } from "../styled/ScreenContainer";
import styled from "styled-components";

const Heading = styled.h1`
  font-size: 5vw;
  color: #61dafb;
  margin-bottom: 10px;
`;

const Avaliability = styled.p`
  font-size: 2vw;
  color: #fff;
`;

const NotMobile = () => {
  return (
    <ScreenContainer>
      <Heading>Open on mobile device</Heading>
      <Avaliability>The game is available only on mobile device</Avaliability>
    </ScreenContainer>
  );
};

export default NotMobile;
