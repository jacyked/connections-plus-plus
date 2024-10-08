'use client'
import { useCallback, useState } from "react";
import GameButton from "./ui/button/game-button";
import GameBoard from "./ui/game/gameboard";
import LosePopup from "./ui/popups/lose-popup";
import WinPopup from "./ui/popups/win-popup";
import NewGamePopup from "./ui/popups/new-game-popup";
import Popup from "./ui/popups/popup";
import useAnimation from "./_hooks/use-animation";
import useGame from "./_hooks/use-game";
import usePopup from "./_hooks/use-popup";
import { GuessResult, Word } from "./_types";
import { getRating } from "./_utils";



export default function Page() {
  const [popupState, showPopup] = usePopup();
  const {
    currentWords,
    currentGroups,
    selectedWords,
    correctGroups,
    wrongGuesses,
    hasWon,
    hasLost,
    prevGuesses,
    selectWord,
    shuffleBoard,
    resetSelection,
    getGuessResult,
    gameWin,
    gameLoss,
  } = useGame();
  const {
    guessAnimationState,
    wrongGuessAnimationState,
    animateGuess,
    animateWrongGuess,
  } = useAnimation();

  const [showWinPopup, setShowWinPopup] = useState(false);
  const [showLosePopup, setShowLosePopup] = useState(false);
  const [showNewGamePopup, setShowNewGamePopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    await animateGuess(selectedWords);

    const result: GuessResult = getGuessResult();

    switch (result.result) {
      case "duplicate":
        showPopup("Already Guessed");
        break;
      case "one-wrong":
        animateWrongGuess();
        showPopup("One away...");
        break;
      case "lose":
        showPopup("Womp womp, you lose.");
        await gameLoss();
        setShowLosePopup(true);
        break;
      case "win":
        showPopup(getRating(wrongGuesses));
        await gameWin();
        setShowLosePopup(true);
        break;
      case "incorrect":
        animateWrongGuess();
        break;
    }
    setSubmitted(false);
  };

  const renderGameButtons = () => {
    const inProgressButtons = (
      <div className="flex gap-2 mb-12">
        <GameButton
          isAlert
          text="New Game"
          onClick={() => {
            setShowNewGamePopup(true)
          }

        }/>
        <GameButton
          text="Shuffle"
          onClick={shuffleBoard}
          unclickable={submitted}
        />
        <GameButton
          text="Deselect All"
          onClick={resetSelection}
          unclickable={selectedWords.length === 0 || submitted}
        />
        <GameButton
          text="Submit"
          unclickable={selectedWords.length !== 4 || submitted}
          onClick={handleSubmit}
        />
      </div>
    );

    const showResultsWonButton = (
      <div className="flex gap-2 mb-12">
        <GameButton
          text="Show Results"
          onClick={() => {
            setShowWinPopup(true);
          }
        }
        />
        <GameButton 
          text="New Game"
          onClick={() => {
            window.location.reload();
          }

        }/>
      </div>
    );

    const showResultsLostButton = (
      <div className="flex gap-2 mb-12">
        <GameButton
          text="Show Results"
          onClick={() => {
            setShowLosePopup(true);
          }
        }
        />
        <GameButton 
          text="New Game"
          onClick={() => {
            window.location.reload();
          }

        }/>
      </div>
    );


    if (hasWon) {
      return showResultsWonButton;
    } else if (hasLost) {
      return showResultsLostButton;
    } else {
      return inProgressButtons;
    }
  };

  const onClickTile = useCallback(
    (word: Word) => {
      selectWord(word);
    },
    [selectWord]
  );
  

  return (
    <>
      <div className="flex flex-col items-center w-11/12 md:w-3/4 lg:w-7/12 mx-auto mt-14">
        <h1 className="text-black text-4xl font-semibold my-4 ml-4">
          Connections<strong>++</strong>
        </h1>
        <hr className="mb-4 md:mb-4 w-full"></hr>
        <h2 className="text-black mb-4">Extreme Difficulty</h2>
        <div className="relative w-full">
          <Popup show={popupState.show} message={popupState.message} />
          <GameBoard
            words={currentWords}
            selectedWords={selectedWords}
            onClick={onClickTile}
            guessedCategories={correctGroups}
            guessAnimationState={guessAnimationState}
            wrongGuessAnimationState={wrongGuessAnimationState}
          />
        </div>
        <div className='flex flex-row items-center justify-center'>
        <h2 className="text-black my-4 md:my-8 mx-8">
          Mistakes Remaining:{" "}
        </h2>
        <span className="text-4xl -mt-1">
          {wrongGuesses > 0 ? Array(wrongGuesses).fill("•") : ""}</span>
        </div>
        {renderGameButtons()}
      </div>
      <WinPopup
        isOpen={showWinPopup}
        onClose={() => setShowWinPopup(false)}
        guessHistory={prevGuesses.current}
        rating={getRating(wrongGuesses)}
      />
      <LosePopup
        isOpen={showLosePopup}
        onClose={() => setShowLosePopup(false)}
        guessHistory={prevGuesses.current}
      />
      <NewGamePopup
        isOpen={showNewGamePopup}
        onClose={() => setShowNewGamePopup(false)}
      />
    </>
  );
}
