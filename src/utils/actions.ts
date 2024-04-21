import { Dispatch } from 'react';

// export const handleMove = (dispatch: Dispatch<any>, wishSpeed: number) => {
//   dispatch({ type: 'update', payload: { wishSpeed } });
// };

export const addPlatform = (dispatch: Dispatch<any>) => {
    dispatch({ type: 'addPlatform' });
};
export const removePlatform = (dispatch: Dispatch<any>, id: string) => {
    dispatch({ type: 'removePlatform', payload: { id } });
};
