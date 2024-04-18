import React, { useReducer } from 'react';
import styled from 'styled-components';
import modalWindow from '../../../../public/Balance/320/modal.png';
import modalWindowBtn from '../../../../public/Balance/320/close.png';

interface BalanceModalProps {
  onClose: () => void;
}

// Стили для оверлея модального окна
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 24px;
  right: 16px;
  width: 142px;
  height: 115px;
  background-image: url('/Balance/320/modal.png');
  @media (min-width: 640px) {
    width: 284px;
    height: 230px;
    background-image: url('/Balance/640/butt.png');
  }
  @media (min-width: 768px) {
    width: 341px;
    height: 276px;
    background-image: url('/Balance/768/butt.png');
  }
`;

const BalanceModal: React.FC<BalanceModalProps> = ({ onClose }) => {
  // Обработчик клика по оверлею, чтобы закрыть модальное окно
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); // Закрыть модальное окно только при клике вне его области
    }
  };
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent></ModalContent>;
    </ModalOverlay>
  );
};

export default BalanceModal;
