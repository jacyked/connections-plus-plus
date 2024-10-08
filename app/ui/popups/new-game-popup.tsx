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
        <h2 className="text-black mb-8">{"Are you sure you want to generate a new game?"}</h2>
        <GameButton text="Reset" onClick={() => window.location.reload()} />
        <GameButton text="Reset" onClick={props.onClose} />
      </div>
    </Modal>
  );
}