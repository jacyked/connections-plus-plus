import { Button } from "@mui/material";




export default function GameButton(props: {
    text: string;
    onClick: () => void;
    unclickable?: boolean;
    isAlert?: boolean;
    canBeSolid?: boolean;
  }) {
    const variant = props?.canBeSolid ? props?.unclickable ? "outlined" : "contained" : "outlined";
    const borderColour = props?.isAlert ? "border-red-500" : props.unclickable ? "border-stone-500" : "border-black";
    const textColour = props?.canBeSolid ? props.unclickable ? props?.isAlert ? "text-red-500" : "text-stone-500" : "text-white" : props.unclickable ? "text-stone-500" : "text-black";
    const fillColour = props?.isAlert ? "warning" : "info"; 
    const click = props.unclickable ? "pointer-events-none" : "";
    
    
  
    return (
      
      <Button
        
        onClick={props.onClick}
        disabled={props.unclickable}
        variant={variant}
        color={fillColour}
        sx={{
          borderRadius: 50
        }}
      >
        {props.text}
      </Button>
      
    );
  }