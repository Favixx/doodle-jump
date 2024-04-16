import {
  CloseButton,
  ModalContainer,
  ModalContent,
} from '@/app/assets/GameOverModal';
import React from 'react';

interface GameOverModalProps {
  onClose: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ onClose }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <h2>Game Over</h2>
        <p>You lost! Try again?</p>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default GameOverModal;
