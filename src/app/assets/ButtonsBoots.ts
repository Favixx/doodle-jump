import styled from 'styled-components';

interface ButtonProps {
  activeImage: string;
  disabledImage: string;
  disabled: boolean;
}

export const Button = styled.button<ButtonProps>`
  /* Общие стили для кнопки */
  border: none;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  width: 50px;
  height: 50px;

  /* Изображение для кнопки */
  background-image: url(${(props) => props.activeImage});

  /* Изображение для неактивной кнопки */
  &:disabled {
    background-image: url(${(props) => props.disabledImage});
    pointer-events: none;
  }
`;

export const ContButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 17px;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 12px;
`;
