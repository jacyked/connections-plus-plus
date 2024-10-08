export type Group = {
    id: number;
    groupID: number;
    category: string;
    words: string[];
    level: 0 | 1 | 2 | 3 | 4;
    guessed?: boolean;
};

export type Word = {
    id: number;
    word: string;
    groupID: number;
    level: 0 | 1 | 2 | 3 | 4;
    selected?: boolean;
    guessed?: boolean;
};

export type GuessResultType =
  | "correct"
  | "incorrect"
  | "duplicate"
  | "one-wrong"
  | "lose"
  | "win";

export type GuessResult = {
    result: GuessResultType;
};

export type TileAnimationState = {
    show: boolean;
    index: number;
};