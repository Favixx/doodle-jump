import { Dispatch } from 'react';
import { handleMoveLeft, handleMoveRight } from './actions';

export const handleTouchStart = (
  event: TouchEvent,
  dispatch: Dispatch<any>
) => {
  const touchX: number = event.touches[0].clientX;
  if (touchX < window.innerWidth / 2) {
    handleMoveLeft(dispatch);
  } else {
    handleMoveRight(dispatch);
  }
};
export const handleTouchEnd = (dispatch: Dispatch<any>) => {
  dispatch({ type: 'update', payload: { direction: null } });
};
