import {
    ModalOverlay,
    ModalContent,
    CloseButton,
} from '@/app/assets/OptionsModal';
import { OptionsModalProps } from '@/utils/types';
import React from 'react';

const OptionsModal: React.FC<OptionsModalProps> = ({ onClose }) => {
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContent>
                <h2>Options</h2>
                <CloseButton onClick={onClose} />
            </ModalContent>
        </ModalOverlay>
    );
};

export default OptionsModal;
