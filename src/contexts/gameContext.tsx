import React, { createContext, useContext, useState, ReactNode } from "react";

interface GameState {
    score: number;
    setScore: (score: number) => void;
    balanceForGame: number;
    setBalanceForGame: (balanceForGame: number) => void;
}

const defaultState: GameState = {
    score: 0,
    setScore: () => { },
    balanceForGame: 0,
    setBalanceForGame: () => { },
};

const GameContext = createContext<GameState>(defaultState);

export const useGame = () => useContext(GameContext);

type GameProviderProps = {
    children: ReactNode;
};

export const GameProvider = ({ children }: GameProviderProps) => {
    const [score, setScore] = useState(defaultState.score);
    const [balanceForGame, setBalanceForGame] = useState(
        defaultState.balanceForGame
    );
    return (
        <GameContext.Provider
            value={{ score, setScore, balanceForGame, setBalanceForGame }}
        >
            {children}
        </GameContext.Provider>
    );
};
