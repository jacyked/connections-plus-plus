import GameButton from "../button/game-button";
import Modal from "./modal";

type RulesPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RulesPopup(props: RulesPopupProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="flex flex-col items-center justify-center px-12">
        <h1 className="text-black text-4xl font-black my-4 ml-4">Rules</h1>
        <h2 className="text-black mb-8">Looking for more of a challenge than NYC Connections?</h2>
        <div className="flex gap-2 mb-12"></div>
        <h2 className="text-black mb-8"><strong>Find groups of four items that share something in common.</strong></h2>
        <h3 className="text-black mb-8">• Select four items and tap '<strong>Submit</strong>' to check if your guess is correct.</h3>
        <h3 className="text-black mb-8">• Find groups without making 4 mistakes!</h3>
        <div className="flex gap-2 mb-12"></div>
        <h2 className="text-black mb-8"><strong>The Twist</strong></h2>
        <h3 className="text-black mb-8">• There are 4 random words mixed in that don't fit in with each other or any of the other categories!</h3>
        <div className="flex gap-2 mb-12"></div>
        <h2 className="text-black mb-8">Good Luck!</h2>
        <GameButton text="Got it!" onClick={props.onClose} />
        </div>
      
    </Modal>
  );
}