import React from "react";
import styled, { keyframes } from "styled-components";
import { ScreenContainer } from "../styled/ScreenContainer";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Spinner = styled.div`
  border: 5px solid rgba(255, 255, 255, 0.2);
  border-top: 5px solid #61dafb;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s linear infinite;
`;

const LoadingSpinner = () => {
  return (
    <ScreenContainer>
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    </ScreenContainer>
  );
};

export default LoadingSpinner;
