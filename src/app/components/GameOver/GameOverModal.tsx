// GameOverModal.tsx
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface GameOverModalProps {
  onClose: () => void;
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const GameOverModal: React.FC<GameOverModalProps> = ({ onClose }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <h2>Game Over</h2>
        <p>You lost! Try again?</p>
        <Link href={"/"}>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </Link>
      </ModalContent>
    </ModalContainer>
  );
};

export default GameOverModal;
