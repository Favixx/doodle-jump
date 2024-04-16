import styled from 'styled-components';
export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ContentContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AvatarContainer = styled.div`
  border-radius: 50%;
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const ButtonSmall = styled.button`
  background-color: transparent;
  background-image: url('/ButtonSmall.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-radius: 17px; */
  /* padding: 50px 10px; */
  font-size: 24px;
  width: 142px;
  height: 88px;
  color: white;
  cursor: pointer;
  @media (min-width: 640px) {
    width: 284px;
    height: 176px;
    background-image: url('/buttonSmall_640.png');
    font-size: 32px;
  }
  @media (min-width: 768px) {
    font-size: 36px;
    background-image: url('/ButtonSmallTablet.png');
    width: 319px;
    height: 198px;
  }
`;
export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  background-image: url('/Button.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  /* border-radius: 20px; */
  /* padding: 50px 10px; */
  font-size: 24px;
  width: 288px;
  height: 104px;
  color: white;
  cursor: pointer;
  @media (min-width: 640px) {
    width: 576px;
    height: 208px;
    background-image: url('/button_640.png');
    font-size: 32px;
  }
  @media (min-width: 768px) {
    width: 648px;
    height: 234px;
    background-image: url('/ButtonTablet.png');
    font-size: 36px;
  }
`;

export const Balance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 32px;
  color: #fff;
`;

export const CharContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;
