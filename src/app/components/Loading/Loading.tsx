import React from "react";
import styled, { keyframes } from "styled-components";
import { ScreenContainer } from "../styled/ScreenContainer";
import LoadingBubble from "../../../../public/bubble.gif";
import Image from "next/image";
import LoadingText from "./LoadingText";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #61dafb;
  width: 100%;
`;

const LoadingSpinner = () => {
  return (
    <>
      <SpinnerContainer>
        <Image src={LoadingBubble} width={125} height={125} alt="Loading..." />
        <LoadingText />
      </SpinnerContainer>
    </>
  );
};

export default LoadingSpinner;
