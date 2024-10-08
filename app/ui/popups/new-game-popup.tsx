import GameButton from "../button/game-button";
import Modal from "./modal";

type WinPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewGamePopup(props: WinPopupProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="flex flex-col items-center justify-center px-12">
        <h1 className="text-black text-4xl font-black my-4 ml-4">Warning</h1>
        <h2 className="text-black mb-8">{"Are you sure you want to generate a new game?"}</h2>
        <div className="flex gap-2 mb-12">
        <GameButton text="Reset" isAlert onClick={() => window.location.reload()} />
        <GameButton text="Continue Current Game" onClick={props.onClose} />
        </div>
      </div>
    </Modal>
  );
}