
import { TileAnimationState, Group, Word } from "@/app/_types";
import Tile from "./tile";
import GuessedCategory from "./guessed";

type GameBoardProps = {
    words: Word[];
    selectedWords: Word[];
    guessedCategories: Group[];
    onClick: (word: Word) => void;
    guessAnimationState: TileAnimationState;
    wrongGuessAnimationState: boolean;
};

export default function GameBoard(props: GameBoardProps) {
    return (
      <div className="grid grid-cols-4 gap-2 w-full">
        {props.guessedCategories.map((group) => (
          <GuessedCategory key={group.category} group={group} />
        ))}
        {props.words.map((item) => (
          <Tile
            key={item.id}
            tileValue={item}
            onClick={props.onClick}
            animateGuess={
              props.guessAnimationState.show &&
              props.guessAnimationState.index ===
                props.selectedWords.indexOf(item)
            }
            animateWrongGuess={
              props.wrongGuessAnimationState && props.selectedWords.includes(item)
            }
          />
        ))}
      </div>
    );
  }