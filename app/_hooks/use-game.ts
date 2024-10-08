import { useEffect, useMemo, useRef, useState } from "react";
import allGroups from "@/app/lib/ConnectionsGroups.json";
import allWordsData from "@/app/lib/ConnectionsWords.json";
import { Group, GuessResult, Word } from "../_types";
import { shuffleTiles, dramaticPause } from "../_utils";

export default function useGame(){
    const [currentWords, setCurrentWords] = useState<Word[]>([]);
    const [currentGroups, setCurrentGroups] = useState<Group[]>([]);
    const selectedWords = useMemo(() => currentWords.filter((item) => item.selected), [currentWords]);
    const [correctGroups, setCorrectGroups] = useState<Group[]>([]);
    const [hasWon, setHasWon] = useState(false);
    const [hasLost, setHasLost] = useState(false);
    const [wrongGuesses, setWrongGuesses] = useState(4);
    const prevGuesses = useRef<Word[][]>([]);

    function generateBoard() { 
        const groupIDs = [];
        const groups = <Group[]>[];
        const allWords = new Set();  // Set to track unique word IDs
    
        const board = <Word[]>[]; //all needed board info for current session
        
        for (let level = 0; level < 4; level++) {
            let isUniqueGroup = false;
            
            while (!isUniqueGroup) {
                let r = Math.floor(Math.random() * 481);  // Generate a random group ID within range
                const levelGroup = allGroups[level].groups.find((element) => element.id == r);  // Find the group by ID for the current level
                
                if (levelGroup) {
                    const wordIDs = levelGroup.words;  // Get the word IDs for the group
                    
                    // Check if the group's words are unique across previously selected groups
                    let hasDuplicate = wordIDs.some(word => allWords.has(word));
                    
                    if (!hasDuplicate) {
                        //console.log(JSON.stringify(levelGroup));
                        // Add the group if no duplicate words are found
                        wordIDs.forEach(word => allWords.add(word));  // Track the word IDs
                        groupIDs.push(r);  // Track the group ID for reference
                        const wordArray = <string[]>[];
                        levelGroup.words.forEach(word => {
                            let thisWord = allWordsData.words.find((element) => element.id == word)?.word;
                            if (thisWord == null){
                                thisWord = "";
                            }
                            wordArray.push(thisWord);
                            const wordObj = <Word>{
                                id: word,
                                groupID: levelGroup.groupId,
                                word: thisWord,
                                level: levelGroup.level,
                                selected: false,
                                guessed: false,
                            }
                            
                            board.push(wordObj);
                        })
                        const selectedGroup = <Group>{
                            id: levelGroup.id,
                            groupID: levelGroup.groupId,
                            category: levelGroup.category,
                            words: wordArray,
                            level: levelGroup.level,
                            guessed: false,
                        }
                        groups.push(selectedGroup);
                        isUniqueGroup = true;  // Move on to the next level
                    }
                }
            }
        }
        //Generate 4 random words and check for duplicates
        let newRandomWords = [];
        let randomWords = <string[]>[];
    
        while (newRandomWords.length < 4) {
            let randomWord = Math.floor(Math.random() * 4462);  // Generate a random word ID between 0 and 4461
            
            // Check if the random word is not in the already selected words
            if (!allWords.has(randomWord)) {
                newRandomWords.push(randomWord);  // Add to the list of new random words
                allWords.add(randomWord);  // Track the word to ensure no future duplicates
                let randWord = allWordsData.words.find((element) => element.id == randomWord)?.word;
                if (randWord == null){
                    randWord = "";
                }
                const wordObj = <Word>{
                    id: randomWord,
                    groupID: -1,
                    word: randWord,
                    level: 4,
                    selected: false,
                    guessed: false,
                }
                randomWords.push(randWord);
                board.push(wordObj);
            }
        }
        const randomGroup = <Group>{
            id: -1,
            groupID: -1,
            category: "Random",
            words: randomWords,
            level: 4,
            guessed: false,
        }
        groups.push(randomGroup);
        const arr = [board, groups];
    
        return (arr);
    }

    useEffect(() => {
        const arr = generateBoard();
        const boardWords = <Word[]>arr[0];
        const boardGroups = <Group[]>arr[1];
        setCurrentGroups(shuffleTiles(boardGroups));
        setCurrentWords(shuffleTiles(boardWords));

    }, []);

    const selectWord = (word: Word): void => {
        const updateWords = currentWords.map((i) => {
            if (word.word === i.word) {
                return {
                    ...i,
                    selected: selectedWords.length < 4 ? !i.selected : false,
                };
            } else {
                return i;
            }
        });
        setCurrentWords(updateWords);
    }

    const shuffleBoard = () => {
        setCurrentWords([...shuffleTiles(currentWords)]);
    }

    const resetSelection = () => {
        setCurrentWords(
            currentWords.map((i) => {
                return {...i, selected: false};
            })
        );
    };

    const getGuessResult = (): GuessResult => {
        const duplicate = prevGuesses.current.some((guess) => guess.every((word) => selectedWords.includes(word)));
        if(duplicate){
            return{result: "duplicate"};
        }

        prevGuesses.current.push(selectedWords);

        const correctWordCount = currentGroups.map((group) => {
            return selectedWords.filter((i) => group.words.includes(i.word)).length;
        });

        const closestGuess = Math.max(...correctWordCount);
        const closestGuessIndex = correctWordCount.indexOf(closestGuess);

        if (closestGuess === 4){
            return correctResult(currentGroups[closestGuessIndex]);
        } else{
            return wrongResult(closestGuess);
        }
    }

    const correctResult = (group: Group): GuessResult => {
        setCorrectGroups([...correctGroups, group]);
        setCurrentWords(
            currentWords.filter((i) => !group.words.includes(i.word))
        );

        if(correctGroups.length === 4) {
            return {result: "win"};
        }else{
            return {result: "correct"}
        }
    }

    const wrongResult = (closestGuess: number): GuessResult => {
        setWrongGuesses(wrongGuesses - 1);

        if(wrongGuesses === 1){
            return { result: "lose"};
        }else if(closestGuess === 3){
            return { result: "one-wrong"}
        }else{
            return{ result: "incorrect"}
        }
    }

    const gameLoss = async () => {
        const remaining = currentGroups.filter((group) => !correctGroups.includes(group));
        resetSelection();

        for (const group of remaining) {
            await dramaticPause(1000);
            setCorrectGroups((prevCorrect) => [
                ...prevCorrect,
                group,
            ]);
            setCurrentWords((prevWords) => prevWords.filter((i) => !group.words.includes(i.word)));
        }

        await dramaticPause(1000);
        setHasLost(true);
    }

    const gameWin = async () => {
        await dramaticPause(1000);
        setHasWon(true);
    }

    return{
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
    };

}