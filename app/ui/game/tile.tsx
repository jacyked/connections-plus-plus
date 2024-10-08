'use client';
import { roboto } from '@/app/ui/fonts';
import clsx from 'clsx';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Word } from "@/app/_types";

type TileProps = {
    tileValue: Word;
    onClick: (word: Word) => void;
    animateGuess: boolean;
    animateWrongGuess: boolean;
    

}

export default function Tile(props: TileProps) {
    const bColour = props.tileValue.selected ? 'bg-sky-100' : 'bg-gray-50';
    const tColour = props.tileValue.selected ? 'text-blue-600' : 'text-black';
    const guessAnimation = props.animateGuess ? "transform -translate-y-2" : "";
    const wrongGuessAnimation = props.animateWrongGuess ? "animate-horizontal-shake" : "";
    
    const handleClick = () => {
        props.onClick(props.tileValue);
      };

    return (
      //<div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        //<div className="flex p-4">
       // </div>
        <button
            className={`${bColour} py-6 rounded-md break-all px-1 transition ease-in-out ${guessAnimation} ${wrongGuessAnimation}`} onClick={handleClick}
        >
            <h2 className={`${tColour} text-xs md:text-lg text-center font-bold`}>
                {props.tileValue.word.toUpperCase()}
            </h2>
        </button>
      //</div>
    );
  }