import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  SkinList,
  Comm,
  Rare,
  Leg,
  Header,
  ShopText,
  SkinName,
  CardSkin,
} from '@/app/assets/ShopModal';
import { ShopModalProps, Skin } from '@/utils/types';
import angel from '../../../public/Shop/Skins/angel.png';
import arbuz from '../../../public/Shop/Skins/arbuz.png';
import cat from '../../../public/Shop/Skins/cat.png';
import demon from '../../../public/Shop/Skins/demon.png';
import johny from '../../../public/Shop/Skins/johny.png';
import nerd1 from '../../../public/Shop/Skins/nerd1.png';
import t1000 from '../../../public/Shop/Skins/t1000.png';
import zvezda from '../../../public/Shop/Skins/zvezda.png';
import main320angel from '../../../public/Shop/MainSkin/320/Stars/angel.png';
import main320arbuz from '../../../public/Shop/MainSkin/320/Stars/arbuz.png';
import main320devil from '../../../public/Shop/MainSkin/320/Stars/devil.png';
import main320johny from '../../../public/Shop/MainSkin/320/Stars/johny.png';
import main320meowy from '../../../public/Shop/MainSkin/320/Stars/meowy.png';
import main320nerd from '../../../public/Shop/MainSkin/320/Stars/nerd.png';
import main320t1000 from '../../../public/Shop/MainSkin/320/Stars/t-1000.png';
import main640angel from '../../../public/Shop/MainSkin/640/Stars/angel.png';
import main640arbuz from '../../../public/Shop/MainSkin/640/Stars/arbuz.png';
import main640devil from '../../../public/Shop/MainSkin/640/Stars/devil.png';
import main640johny from '../../../public/Shop/MainSkin/640/Stars/johny.png';
import main640meowy from '../../../public/Shop/MainSkin/640/Stars/meowy.png';
import main640nerd from '../../../public/Shop/MainSkin/640/Stars/nerd.png';
import main640t1000 from '../../../public/Shop/MainSkin/640/Stars/t-1000.png';
import main768angel from '../../../public/Shop/MainSkin/768/Stars/angel.png';
import main768arbuz from '../../../public/Shop/MainSkin/768/Stars/arbuz.png';
import main768devil from '../../../public/Shop/MainSkin/768/Stars/devil.png';
import main768johny from '../../../public/Shop/MainSkin/768/Stars/johny.png';
import main768meowy from '../../../public/Shop/MainSkin/768/Stars/meowy.png';
import main768nerd from '../../../public/Shop/MainSkin/768/Stars/nerd.png';
import main768t1000 from '../../../public/Shop/MainSkin/768/Stars/t-1000.png';

// import main640 from '../../../public/Shop/MainSkin/640/Stars/';
import Image from 'next/image';
import { useState } from 'react';
import MainSkinModal from './MainSkinModal/MainSkinModal';

const skinsArr: Skin[] = [
  {
    id: 1,
    name: 'angel',
    source: angel,
    width: 120,
    quality: 'leg',
    main320: main320angel,
    main640: main640angel,
    main768: main768angel,
  },
  {
    id: 2,
    name: 'arbuz',
    source: arbuz,
    width: 120,
    quality: 'rare',
    main320: main320arbuz,
    main640: main640arbuz,
    main768: main768arbuz,
  },
  {
    id: 3,
    name: 'meowy',
    source: cat,
    width: 120,
    quality: 'rare',
    main320: main320meowy,
    main640: main640meowy,
    main768: main768meowy,
  },
  {
    id: 4,
    name: 'devil',
    source: demon,
    width: 120,
    quality: 'leg',
    main320: main320devil,
    main640: main640devil,
    main768: main768devil,
  },
  {
    id: 5,
    name: 'johny',
    source: johny,
    width: 120,
    quality: 'comm',
    main320: main320johny,
    main640: main640johny,
    main768: main768johny,
  },
  {
    id: 6,
    name: 'nerd',
    source: nerd1,
    width: 120,
    quality: 'comm',
    main320: main320nerd,
    main640: main640nerd,
    main768: main768nerd,
  },
  {
    id: 7,
    name: 't-1000',
    source: t1000,
    width: 120,
    quality: 'comm',
    main320: main320t1000,
    main640: main640t1000,
    main768: main768t1000,
  },
  // { id: 8, name: 'zvezda', source: zvezda, width: 120, quality: 'default' },
];

const ShopModal: React.FC<ShopModalProps> = ({ onClose }) => {
  const [showShopMainSkinModal, setShowShopMainSkinModal] =
    useState<boolean>(false); // Состояние для отображения модального окна

  const [card, setCard] = useState<Skin>(); // Используем интерфейс Skin

  // const [card, setCard] = useState<object>({}); // Состояние для хранения качества выбранной карточки
  // const [, set] = useState<string>(''); // Состояние для хранения качества выбранной карточки

  // Обработчик клика на карточку, который изменяет состояние и передает качество карточки
  const handleCardClick = (card: Skin) => {
    setCard(card);
    setShowShopMainSkinModal(true);
  };

  const commSkins = skinsArr.filter((el) => el.quality === 'comm');
  const rareSkins = skinsArr.filter((el) => el.quality === 'rare');
  const legSkins = skinsArr.filter((el) => el.quality === 'leg');

  return (
    <ModalOverlay>
      <ModalContent>
        <Header>
          <ShopText>Shop</ShopText>
          <CloseButton onClick={onClose} />
        </Header>
        <SkinList>
          {commSkins.map((el) => (
            <Comm onClick={() => handleCardClick(el)} key={el.id}>
              <CardSkin>
                <Image
                  src={el.source}
                  alt={el.name}
                  width={el.width}
                  key={el.id}
                />
                <SkinName>{el.name}</SkinName>
              </CardSkin>
            </Comm>
          ))}

          {rareSkins.map((el) => (
            <Rare onClick={() => handleCardClick(el)} key={el.id}>
              <CardSkin>
                <Image
                  src={el.source}
                  alt={el.name}
                  width={el.width}
                  key={el.id}
                />
                <SkinName>{el.name}</SkinName>
              </CardSkin>
            </Rare>
          ))}

          {legSkins.map((el) => (
            <Leg onClick={() => handleCardClick(el)} key={el.id}>
              <CardSkin>
                <Image
                  src={el.source}
                  alt={el.name}
                  width={el.width}
                  key={el.id}
                />
                <SkinName>{el.name}</SkinName>
              </CardSkin>
            </Leg>
          ))}
        </SkinList>
      </ModalContent>
      {showShopMainSkinModal && (
        <MainSkinModal
          onClose={() => setShowShopMainSkinModal(false)}
          card={card}
        />
      )}
    </ModalOverlay>
  );
};

export default ShopModal;
