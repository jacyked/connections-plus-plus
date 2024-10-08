export default function GameButton(props: {
    text: string;
    onClick: () => void;
    unclickable?: boolean;
    isAlert?: boolean;
  }) {
    const click = props.unclickable ? "pointer-events-none" : "";
    const bColour = props?.isAlert ? "border-red-500" : props.unclickable ? "border-stone-500" : "border-black";
    const tColour = props?.isAlert ? "text-red-500" : props.unclickable ? "text-stone-500" : "text-black";
  
    return (
      <button
        className={`${bColour} border rounded-full ${tColour} font-medium py-3 px-4 text-l ${click}`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    );
  }