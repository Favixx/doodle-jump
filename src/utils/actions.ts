import { Dispatch } from 'react';

export const handleMoveLeft = (dispatch: Dispatch<any>) => {
  dispatch({ type: 'moveLeft' });
};

export const handleMoveRight = (dispatch: Dispatch<any>) => {
  dispatch({ type: 'moveRight' });
};

export const addPlatform = (dispatch: Dispatch<any>) => {
  dispatch({ type: 'addPlatform' });
};
