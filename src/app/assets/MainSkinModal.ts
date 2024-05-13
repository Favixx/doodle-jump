import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

export const ModalContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.div`
  position: relative;
`;

export const QualityLineImg = styled.div`
  > img {
    height: 48px !important;
  }
`;

export const QualityTitle = styled.h2`
  text-transform: uppercase;
  margin: 0;
  margin-top: -38px;
  text-align: center;
  color: white;
  letter-spacing: 0.75;
  font-weight: normal;
`;

export const CloseButton = styled.button`
  position: absolute;
  padding: 0;
  top: 16px;
  right: 16px;
  background-color: transparent;
  border: none;
  background-image: url('./buttonclose.png');
  width: 40px;
  height: 40px;
`;

export const Main = styled.div`
  margin: 0 auto;
  margin-top: 10%;
`;

export const ImageCloud = styled.div`
  > img {
    margin: 0 auto;
  }
`;

export const ImageSkin = styled.div`
  margin-top: 24px;
  > img {
    margin: 0 auto;
  }
`;

export const Buttons = styled.div``;

export const ButtonsBoost = styled.div``;

interface ButtonProps {
  image: string;
}
export const ButtonBuy = styled.button<ButtonProps>`
  background-image: url(${(props) => props.image});
  border: none;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  width: 288px;
  height: 104px;
  margin: 0 auto;
  font-size: 40px;
  color: #fff;
  letter-spacing: 0.75px;
  margin-bottom: 32px;
`;

export const ButtonBoost = styled.button``;
