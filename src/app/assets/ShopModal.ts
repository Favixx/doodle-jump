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
`;

export const Header = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  height: 72px;
  justify-content: center;
  align-items: center;
`;

export const ShopText = styled.h2`
  margin: 0;
  text-transform: uppercase;
  font-size: 40px;
  color: #fff;
  letter-spacing: 1px;
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

export const SkinList = styled.div`
  height: 100vh;
  overflow-y: scroll;
  margin-top: 72px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px 16px;
  padding-bottom: 102px;
`;

export const Comm = styled.button`
  background: transparent;
  background-image: url('./Shop/320/320IconComm.png');
  background-repeat: no-repeat;
  width: 144px;
  height: 160px;
  border: none;
`;
export const Rare = styled.button`
  background: transparent;
  border: none;
  background-image: url('./Shop/320/320IconRare.png');
  background-repeat: no-repeat;
  width: 144px;
  height: 160px;
`;
export const Leg = styled.button`
  background: transparent;
  border: none;
  background-image: url('./Shop/320/320IconLeg.png');
  background-repeat: no-repeat;
  width: 144px;
  height: 160px;
`;

export const SkinName = styled.span`
  text-transform: uppercase;
  font-size: 20px;
  color: #fff;
`;

export const CardSkin = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 12px;
  padding-bottom: 11px;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
