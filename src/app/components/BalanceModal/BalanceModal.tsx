import React from 'react';
import { ModalContent, ModalOverlay } from '@/app/assets/BalanceModal';
import { BalanceModalProps } from '@/utils/types';

const BalanceModal: React.FC<BalanceModalProps> = ({ onClose }) => {
    // Обработчик клика по оверлею, чтобы закрыть модальное окно
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose(); // Закрыть модальное окно только при клике вне его области
        }
    };
    return (
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContent></ModalContent>
        </ModalOverlay>
    );
};

export default BalanceModal;
