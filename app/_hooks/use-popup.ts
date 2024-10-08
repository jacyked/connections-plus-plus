import { useState } from "react";
import { dramaticPause } from "../_utils";

export default function usePopup() {
  const [popupState, setPopupState] = useState({ show: false, message: "" });

  const showPopup = async (message: string) => {
    setPopupState({ show: true, message: message });
    await dramaticPause(1500);
    setPopupState({ show: false, message: "" });
  };

  return [popupState, showPopup] as const;
}