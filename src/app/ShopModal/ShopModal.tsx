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
import { ShopModalProps } from '@/utils/types';
import angel from '../../../public/Shop/Skins/angel.png';
import arbuz from '../../../public/Shop/Skins/arbuz.png';
import cat from '../../../public/Shop/Skins/cat.png';
import demon from '../../../public/Shop/Skins/demon.png';
import johny from '../../../public/Shop/Skins/johny.png';
import nerd1 from '../../../public/Shop/Skins/nerd1.png';
import t1000 from '../../../public/Shop/Skins/t1000.png';
import zvezda from '../../../public/Shop/Skins/zvezda.png';
import Image, { StaticImageData } from 'next/image';

interface skin {
  id: number;
  name: string;
  source: StaticImageData;
  width: number;
  quality: string;
}

const skinsArr: skin[] = [
  { id: 1, name: 'angel', source: angel, width: 120, quality: 'leg' },
  { id: 2, name: 'arbuz', source: arbuz, width: 120, quality: 'rare' },
  { id: 3, name: 'meowy', source: cat, width: 120, quality: 'rare' },
  { id: 4, name: 'devil', source: demon, width: 120, quality: 'leg' },
  { id: 5, name: 'johny', source: johny, width: 120, quality: 'comm' },
  { id: 6, name: 'nerd', source: nerd1, width: 120, quality: 'comm' },
  { id: 7, name: 't-1000', source: t1000, width: 120, quality: 'comm' },
  // { id: 8, name: 'zvezda', source: zvezda, width: 120, quality: 'default' },
];

const ShopModal: React.FC<ShopModalProps> = ({ onClose }) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const commSkins = skinsArr.filter((el) => el.quality === 'comm');
  const rareSkins = skinsArr.filter((el) => el.quality === 'rare');
  const legSkins = skinsArr.filter((el) => el.quality === 'leg');

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <Header>
          <ShopText>Shop</ShopText>
          <CloseButton onClick={onClose} />
        </Header>
        <SkinList>
          {commSkins.map((el) => (
            <Comm key={el.id}>
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
            <Rare key={el.id}>
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
            <Leg key={el.id}>
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
    </ModalOverlay>
  );
};

export default ShopModal;
