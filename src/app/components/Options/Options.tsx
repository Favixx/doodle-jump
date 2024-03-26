import React, { useReducer } from "react";
import styled from "styled-components";

// Стили для оверлея модального окна
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Стили для контента модального окна
const ModalContent = styled.div`
  background-color: #cb6cc7;
  width: 82vw;
  height: 75vh;
  padding: 20px;
  border-radius: 8px;
  position: relative; /* Добавляем позиционирование для кнопки закрытия */
  background-image: radial-gradient(
    circle at 37.72% -19.64%,
    #e96ef3 0,
    #c45bf4 16.67%,
    #934af3 33.33%,
    #443cf2 50%,
    #0035f0 66.67%,
    #0035ee 83.33%,
    #0035eb 100%
  );
`;

const Gifplacer = styled.div`
  position: absolute;
  top: 12%;
  left: 50%;

  transform: translate(-50%);
  width: 256px;
  height: 416px;
  background-image: url("./gifplacer320.png");
`;

// Стили для кнопки закрытия модального окна
const CloseButton = styled.button`
  position: absolute;
  padding: 0;
  top: 8px;
  right: 16px;
  background-color: transparent;
  border: none;
  background-image: url("./buttonclose.png");
  width: 40px;
  height: 40px;
`;

// Стили для иконки закрытия модального окна
// const CloseIcon = styled.span``;

// Интерфейс пропсов для компонента OptionsModal
interface OptionsModalProps {
  onClose: () => void;
}

const Switcher = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%);
`;

// Стили для свитчера
const SwitcherWrapper = styled.div<{ switched: boolean }>`
  width: 162px;
  height: 87px;
  padding: 6px 7px;
  align-items: center;
  border-radius: 50px;
  background-color: ${({ switched }) => (switched ? "#183A5D" : "#fff")};
  transition: background-color 0.25s ease-in-out;
  position: relative;
`;

// Стили для состояния свитчера
const SwitcherState = styled.div<{ switched: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: ${({ switched }) => (switched ? "#fff" : "#183A5D")};
  position: absolute;
  left: ${({ switched }) => (switched ? "calc(100% - 80px)" : "4px")};
  transition: left 0.25s ease-in-out, background-color 0.25s ease-in-out;
`;

// Тип для действия
type Action = { type: "TOGGLE" };

// Интерфейс для состояния свитчера
interface State {
  switched: boolean;
}

// Начальное состояние свитчера
const initialState: State = { switched: false };

// Редуктор для изменения состояния свитчера
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE":
      return { switched: !state.switched };
    default:
      return state;
  }
};

// Компонент модального окна с опциями
const OptionsModal: React.FC<OptionsModalProps> = ({ onClose }) => {
  // Обработчик клика по оверлею, чтобы закрыть модальное окно
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); // Закрыть модальное окно только при клике вне его области
    }
  };

  // Использование useReducer для управления состоянием свитчера
  const [state, dispatch] = useReducer(reducer, initialState);

  // Обработчик клика по свитчеру для его изменения
  const handleClick = () => {
    dispatch({ type: "TOGGLE" }); // Переключить состояние свитчера
    console.log(state.switched ? 0 : 1); // Вывести состояние свитчера в консоль
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <Gifplacer></Gifplacer>
        {/* Кнопка закрытия модального окна */}
        <CloseButton onClick={onClose}>
          {/* <CloseIcon>&times;</CloseIcon> */}
        </CloseButton>
        {/* Заголовок модального окна */}
        <h2>Options</h2>
        {/* Свитчер для опций */}
        <Switcher>
          <SwitcherWrapper switched={state.switched} onClick={handleClick}>
            <SwitcherState switched={state.switched} />
          </SwitcherWrapper>
        </Switcher>
        {/* Дополнительный контент для настроек */}
      </ModalContent>
    </ModalOverlay>
  );
};

export default OptionsModal;
