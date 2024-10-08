import { Word } from "@/app/_types";
import GameButton from "../button/game-button";
import PrevGuesses from "../game/prev-guesses";
import Modal from "./modal";

type LosePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  guessHistory: Word[][];
};

export default function LosePopup(props: LosePopupProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="flex flex-col items-center justify-center px-12">
        <h1 className="text-black text-3xl font-black my-4 ml-4">
          {"Next time!"}
        </h1>
        <hr className="mb-2 md:mb-4 w-full"></hr>
        <PrevGuesses prevGuesses={props.guessHistory} />
        <GameButton text="Exit" onClick={props.onClose} />
      </div>
    </Modal>
  );
}