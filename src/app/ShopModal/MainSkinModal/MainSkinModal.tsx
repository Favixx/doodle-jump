import {
  ButtonBoost,
  ButtonBuy,
  Buttons,
  CloseButton,
  Header,
  ImageCloud,
  ImageSkin,
  Main,
  ModalContent,
  ModalOverlay,
  QualityLineImg,
  QualityTitle,
} from '@/app/assets/MainSkinModal';
import { MainSkinModalProps } from '@/utils/types';

import headComm from '../../../../public/Shop/MainSkin/320/HeadComm.png';
import headLeg from '../../../../public/Shop/MainSkin/320/HeadLeg.png';
import headRare from '../../../../public/Shop/MainSkin/320/HeadRare.png';
import cloud from '../../../../public/Shop/MainSkin/320/cloud.png';
import Image from 'next/image';
import ButtonsBoost from './ButtonsBoost/ButtonsBoots';

const MainSkinModal: React.FC<MainSkinModalProps> = ({ onClose, card }) => {
  const qualityForHeader = () => {
    if (card && card.quality === 'comm') {
      return headComm;
    } else if (card && card.quality === 'rare') {
      return headRare;
    } else {
      return headLeg;
    }
  };

  const qualityTitle = () => {
    if (card && card.quality === 'comm') {
      return 'common';
    } else if (card && card.quality === 'rare') {
      return 'rare';
    } else {
      return 'legendary';
    }
  };

  const activeButtons = () => {
    if (card && card.quality === 'comm') {
      return [true, false, false]; // Только первая кнопка активна для скина common
    } else if (card && card.quality === 'rare') {
      return [true, true, false]; // Первые две кнопки активны для скина rare
    } else {
      return [true, true, true]; // Все три кнопки активны для скина legendary
    }
  };

  const imagePath320 = card && card.main320 ? card.main320 : '';

  return (
    <ModalOverlay>
      <ModalContent>
        <Header>
          <CloseButton onClick={onClose} />
          <QualityLineImg>
            <Image
              src={qualityForHeader()}
              alt={'skin'}
              layout="responsive"
              height={48}
            />
          </QualityLineImg>
          <QualityTitle>{qualityTitle()}</QualityTitle>
        </Header>
        <Main>
          <ImageCloud>
            <Image src={cloud} alt={'cloud'} />
          </ImageCloud>
          <ImageSkin>
            <Image
              src={imagePath320}
              alt={card && card.name ? card.name : ''}
            />
          </ImageSkin>
        </Main>
        <Buttons>
          <ButtonsBoost activeButtons={activeButtons()} />
          <ButtonBuy image="./Shop/MainSkin/320/Button.png">Виу</ButtonBuy>
        </Buttons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MainSkinModal;
