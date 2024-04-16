import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  font-size: 5vw;
  color: #61dafb;
  margin-bottom: 10px;
  text-align: center;
`;

const Avaliability = styled.p`
  text-align: center;
  font-size: 2vw;
  color: #fff;
`;

const NotMobile = () => {
  return (
    <>
      <Heading>Open on mobile device</Heading>
      <Avaliability>The game is available only on mobile devices</Avaliability>
    </>
  );
};

export default NotMobile;
