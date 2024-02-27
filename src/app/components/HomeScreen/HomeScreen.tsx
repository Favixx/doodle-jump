"use client";
import React from "react";
import styled from "styled-components";
import userAvatar from "../../../../public/Avatar.jpg";
import Image from "next/image";
import { ScreenContainer } from "../styled/ScreenContainer";

// Стилізовані компоненти

const AvatarContainer = styled.div`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-bottom: 5px;
  /* border: 1px solid #fff; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Name = styled.h1`
  color: #61dafb;
  margin-bottom: 10px;
`;

const StartButton = styled.button`
  background-color: #61dafb;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
  width: 250px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #83bfeb;
  }
`;

const Rating = styled.div`
  color: #fff;
  margin-bottom: 80px;
`;

const HomeScreen = () => {
  return (
    <ScreenContainer>
      <AvatarContainer>
        <Image src={userAvatar} alt="Player Avatar" width={120} height={120} />
      </AvatarContainer>
      <Name>Player name</Name>
      <Rating>Balance: 1200</Rating>
      <StartButton>Start</StartButton>
    </ScreenContainer>
  );
};

export default HomeScreen;
