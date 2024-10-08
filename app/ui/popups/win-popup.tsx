import { Word } from "@/app/_types";
import GameButton from "../button/game-button";
import PrevGuesses from "../game/prev-guesses";
import Modal from "./modal";

type WinPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  guessHistory: Word[][];
  rating: string;
};

export default function WinPopup(props: WinPopupProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="flex flex-col items-center justify-center px-12">
        <h1 className="text-black text-4xl font-black my-4 ml-4">
          {props.rating}
        </h1>
        <hr className="mb-2 md:mb-4 w-full"></hr>
        <h2 className="text-black mb-8">{"You've won the game!"}</h2>
        <PrevGuesses prevGuesses={props.guessHistory} />
        <GameButton text="Exit" onClick={props.onClose} />
      </div>
    </Modal>
  );
}