'use client';
import React from 'react';
import styled from 'styled-components';

// Стилізовані компоненти
const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #282c34;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-bottom: 5px;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
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
      <Avatar src='avatar_url_here' alt='Player Avatar' />
      <Name>Player name</Name>
      <Rating>Balance: 1200</Rating>
      <StartButton>Start</StartButton>
    </ScreenContainer>
  );
};

export default HomeScreen;
