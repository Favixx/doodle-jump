import { useReducer } from 'react';
import reducer from '@/utils/reducer';
import { INITIAL_STATE } from '@/utils/constants';

export const useGameReducer = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    return { state, dispatch };
};
