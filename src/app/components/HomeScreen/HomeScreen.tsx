"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { ScreenContainer } from "../styled/ScreenContainer";
import useUserContext from "@/hooks/useUserContext";

import balanceImage from "../../../../public/balance.png";
import userAvatar from "../../../../public/Avatar.jpg";
import starImage from "../../../../public/star.gif";
// import starImage768 from "../../../../public/star768.png";

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ContentContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AvatarContainer = styled.div`
  border-radius: 50%;
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ButtonSmall = styled.button`
  background-color: transparent;
  background-image: url("/ButtonSmall.png");
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
  @media (min-width: 768px) {
    font-size: 36px;
    background-image: url("/ButtonSmallTablet.png");
    width: 319px;
    height: 198px;
  }
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  background-image: url("/Button.png");
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
  @media (min-width: 768px) {
    width: 648px;
    height: 234px;
    background-image: url("/ButtonTablet.png");
    font-size: 36px;
  }
`;

const Balance = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 32px;
  color: #fff;
`;

const CharContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const HomeScreen = () => {
  // Приклад використання контексту
  // const { user, updateUser } = useUserContext();
  // <p>Баланс: {user.balance}</p>
  // <button onClick={() => updateUser({ balance: 20 })}>Змінити баланс</button>

  const [currentStarSizes, setCurrentStarSizes] = useState([181, 176]);
  const { user, updateUser } = useUserContext();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCurrentStarSizes([181, 176]);
      } else {
        setCurrentStarSizes([408, 397]);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScreenContainer>
      <ContentContainer>
        <Balance>
          <Image src={balanceImage} width={48} height={60} alt="Balance" />
          {user.balance}
        </Balance>
        <AvatarContainer>
          {user.avatar ? (
            user.avatar
          ) : (
            <Image
              src={userAvatar}
              alt="Player Avatar"
              width={75}
              height={75}
            />
          )}
        </AvatarContainer>
      </ContentContainer>
      <ContentContainerColumn>
        <CharContainer>
          <Image
            src={starImage}
            alt="Character Skin"
            width={currentStarSizes[0]}
            height={currentStarSizes[1]}
          />
        </CharContainer>
        <ButtonsContainer>
          <Link href={"/game"}>
            <Button>Start</Button>
          </Link>
          <ButtonContainer>
            <ButtonSmall>Shop</ButtonSmall>
            <ButtonSmall>Options</ButtonSmall>
          </ButtonContainer>
        </ButtonsContainer>
      </ContentContainerColumn>
    </ScreenContainer>
  );
};

export default HomeScreen;
