'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ScreenContainer } from '../../assets/ScreenContainer';
import useUserContext from '@/hooks/useUserContext';
import OptionsModal from '../Options/Options';
import balanceImage from '../../../../public/balance.png';
import userAvatar from '../../../../public/Avatar.jpg';
import starImage from '../../../../public/star.gif';
import {
    AvatarContainer,
    Balance,
    Button,
    ButtonContainer,
    ButtonSmall,
    ButtonsContainer,
    CharContainer,
    ContentContainer,
    ContentContainerColumn,
} from '@/app/assets/HomeScreen';
import BalanceModal from '../BalanceModal/BalanceModal';

const HomeScreen = () => {
    // Приклад використання контексту
    // const { user, updateUser } = useUserContext();
    // <p>Баланс: {user.balance}</p>
    // <button onClick={() => updateUser({ balance: 20 })}>Змінити баланс</button>

    const [currentStarSizes, setCurrentStarSizes] = useState<number[]>([
        181, 176,
    ]);
    const [showOptionsModal, setShowOptionsModal] = useState(false); // Состояние для отображения модального окна
    const [showBalanceModal, setShowBalanceModal] = useState(false); // Состояние для отображения модального окна

    const { user, updateUser } = useUserContext();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setCurrentStarSizes([181, 176]);
            } else if (window.innerWidth > 640 && window.innerWidth < 768) {
                setCurrentStarSizes([362, 352]);
            } else {
                setCurrentStarSizes([408, 397]);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ScreenContainer>
            <ContentContainer>
                <Balance onClick={() => setShowBalanceModal(true)}>
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
                    <Link href={'/game'}>
                        <Button>Start</Button>
                    </Link>
                    <ButtonContainer>
                        <ButtonSmall>Shop</ButtonSmall>
                        <ButtonSmall onClick={() => setShowOptionsModal(true)}>
                            Options
                        </ButtonSmall>
                        {showOptionsModal && (
                            <OptionsModal onClose={() => setShowOptionsModal(false)} />
                        )}
                    </ButtonContainer>
                </ButtonsContainer>
            </ContentContainerColumn>
            {showBalanceModal && (
                <BalanceModal onClose={() => setShowBalanceModal(false)} />
            )}
        </ScreenContainer>
    );
};

export default HomeScreen;
