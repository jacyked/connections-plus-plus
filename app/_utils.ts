export const getWordColour = (level: 0 | 1 | 2 | 3 | 4): string => {
    switch (level) {
      case 0:
        return "bg-yellow-300";
      case 1:
        return "bg-lime-500";
      case 2:
        return "bg-blue-300";
      case 3:
        return "bg-purple-400";
     case 4:
        return 'bg-red-500';
      default:
        return "bg-black";
    }
  };

  export const shuffleTiles = <T>(array: T[]): T[] => {
    const shuffledTiles = [...array];
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements array[i] and array[j]
      [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
    }
  
    return shuffledTiles;
  };

  export const dramaticPause = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  export const getRating = (wrongGuesses: number) => {
    switch (wrongGuesses) {
      case 4:
        return "Perfect!";
      case 3:
        return "Nice!";
      case 2:
        return "Good!";
      default:
        return "Phew!";
    }
  };

