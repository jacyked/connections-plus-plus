## Connections++

This is a practice project with next.js based on the NYT Connections game (no *connection* or affiliation)

At the moment, the game pulls 1 category of each difficulty at random from a pool of all past Connections puzzles (at the time of creation, ~482? I believe). 
The difference with this version is that it also generates a new "category"; 4 random words are also drawn from the global pool and added to the puzzle, meaning you have to guess 4 categories correctly instead of 3 in the original game (the final category never counts).
There is some checking to make sure no duplicate words are present, but with this number of possible combinations I have yet to confirm that it functions at 100%. 


## Roadmap/TODO

- Add different game modes:
    - Extra Hard: Instead of 4 random words, add 2 words from 2 random categories
    - Classic++: Part of the difficulty of the original game is that there are often categories that can be mixed together; this game mode will re-use the original puzzles instead of generating them at random, but still add 4 random (or 2/2) words.
- Improve layout/mobile responsiveness
- Add animations for the Remaining Guesses dots
- Add placeholder tiles until the game is generated

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
