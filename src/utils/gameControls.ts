import { Dispatch } from 'react';

export const handleTouch = (
    event: TouchEvent,
    dispatch: Dispatch<any>
) => {
    const wishPlayerX = event?.touches?.[0]?.clientX;
    dispatch({ type: 'update', payload: { wishPlayerX } });
};