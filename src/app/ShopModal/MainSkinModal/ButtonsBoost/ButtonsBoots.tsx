import { Button, ContButtons } from '@/app/assets/ButtonsBoots';
import React from 'react';

interface ButtonsBoostProps {
  activeButtons: boolean[];
}

const ButtonsBoost: React.FC<ButtonsBoostProps> = ({ activeButtons }) => {
  return (
    <ContButtons>
      {/* Кнопка улучшения 1 */}
      <Button
        activeImage="./Shop/MainSkin/320/32.png"
        disabledImage="/Shop/MainSkin/320/UnlockLeg.png"
        disabled={!activeButtons[0]}
      />

      {/* Кнопка улучшения 2 */}
      <Button
        activeImage="./Shop/MainSkin/320/Unlockrare.png"
        disabledImage="/Shop/MainSkin/320/Grennlock.png"
        disabled={!activeButtons[1]}
      />

      {/* Кнопка улучшения 3 */}
      <Button
        activeImage="./Shop/MainSkin/320/UnlockLeg.png"
        disabledImage="/Shop/MainSkin/320/Block2.png"
        disabled={!activeButtons[2]}
      />
    </ContButtons>
  );
};

export default ButtonsBoost;
