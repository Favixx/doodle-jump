import { createContext } from "react";

interface Game {
  skin: string;
  char: object;
}

const defaultValue: Game = {
  skin: "",
  char: {},
};

const GameContext = createContext<Game>(defaultValue);
