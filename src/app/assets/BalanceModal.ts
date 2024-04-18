import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
`;

export const ModalContent = styled.div`
  position: fixed;
  top: 24px;
  right: 16px;
  width: 142px;
  height: 115px;
  background-image: url('/Balance/320/modal.png');
  @media (min-width: 640px) {
    width: 284px;
    height: 230px;
    background-image: url('/Balance/640/butt.png');
  }
  @media (min-width: 768px) {
    width: 341px;
    height: 276px;
    background-image: url('/Balance/768/butt.png');
  }
`;
