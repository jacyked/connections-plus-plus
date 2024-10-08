import { useState } from "react";
import { TileAnimationState, Word } from "../_types";
import { dramaticPause } from "../_utils";

export default function useAnimation() {
  const [guessAnimationState, setGuessAnimationState] =
    useState<TileAnimationState>({
      show: false,
      index: -1,
    });
  const [wrongGuessAnimationState, setWrongGuessAnimationState] =
    useState(false);

  const animateGuess = async (selectedWords: Word[]) => {
    for (let i = 0; i < selectedWords.length; i++) {
      if (selectedWords[i].selected) {
        setGuessAnimationState({ show: true, index: i });
        await dramaticPause(100);
      }
    }

    setGuessAnimationState({ show: false, index: -1 });
    await dramaticPause(500);
  };

  const animateWrongGuess = async () => {
    setWrongGuessAnimationState(true);
    await dramaticPause(225);
    setWrongGuessAnimationState(false);
  };

  return {
    guessAnimationState,
    wrongGuessAnimationState,
    animateGuess,
    animateWrongGuess,
  };
}