import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import styles from '@/app/ui/home.module.css';
import { montserrat } from '@/app/ui/fonts';
import { promises as fs } from 'fs';
import allGroups from "@/app/lib/ConnectionsGroups.json";
import allWordsData from "@/app/lib/ConnectionsWords.json";

//Generate the starting board
function generateBoard() { 
    let groupIDs = [];
    let groups = [];
    let allWords = new Set();  // Set to track unique word IDs

    const board = []; //all needed board info for current session
    
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
                    groups.push(levelGroup);  // Add the group if no duplicate words are found
                    wordIDs.forEach(word => allWords.add(word));  // Track the word IDs
                    groupIDs.push(r);  // Track the group ID for reference
                    
                    levelGroup.words.forEach(word => {
                        const wordObj = {
                            id: word,
                            groupID: levelGroup.groupId,
                            level: levelGroup.level,
                            category: levelGroup.category,
                            word: allWordsData.words.find((element) => element.id == word)?.word,

                        }
                        board.push(wordObj);
                    })
                    isUniqueGroup = true;  // Move on to the next level
                }
            }
        }
    }
    //Generate 4 random words and check for duplicates
    let newRandomWords = [];

    while (newRandomWords.length < 4) {
        let randomWord = Math.floor(Math.random() * 4462);  // Generate a random word ID between 0 and 4461
        
        // Check if the random word is not in the already selected words
        if (!allWords.has(randomWord)) {
            newRandomWords.push(randomWord);  // Add to the list of new random words
            allWords.add(randomWord);  // Track the word to ensure no future duplicates
            const wordObj = {
                id: randomWord,
                level: 4,
                groupID: -1,
                category: "RANDOM",
                word: allWordsData.words.find((element) => element.id == randomWord)?.word,

            }
            board.push(wordObj);
        }
    }

    return JSON.stringify(board);
}

//Shuffle board
function shuffleBoard() {

}


export default function GameBoard() {


  return (
    <div className="grid grid-cols-4 gap-4 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <p>{generateBoard()}</p>
    </div>
  );
}