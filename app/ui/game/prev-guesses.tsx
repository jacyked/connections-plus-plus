import { Word } from "@/app/_types";
import { getWordColour } from "@/app/_utils";

type PrevGuessesProps = {
  prevGuesses: Word[][];
};

export default function PrevGuesses(props: PrevGuessesProps) {
  return (
    <div className="grid grid-cols-4 gap-y-1 mb-12">
      {props.prevGuesses.map((guesses) =>
        guesses.map((word, index) => (
          <div
            key={index}
            className={`size-12 rounded-md ${getWordColour(word.level)}`}
          ></div>
        ))
      )}
    </div>
  );
}