import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #cb6cc7;
  width: 82vw;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  background-image: radial-gradient(
    circle at 37.72% -19.64%,
    #e96ef3 0,
    #c45bf4 16.67%,
    #934af3 33.33%,
    #443cf2 50%,
    #0035f0 66.67%,
    #0035ee 83.33%,
    #0035eb 100%
  );
  h2 {
    margin: 16px 0;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  padding: 0;
  top: 8px;
  right: 16px;
  background-color: transparent;
  border: none;
  background-image: url('./buttonclose.png');
  width: 40px;
  height: 40px;
`;
