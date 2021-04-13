// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

let UserWord = '';
let UserScore = 0

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
  
  for (i = 0; i < word.length; i++) {
    for (const pointValue in newPointStructure) {
      if(pointValue == word[i].toLowerCase()) {
        UserScore += Number(newPointStructure[pointValue]);
      };
    };
  };
  letterPoints += `Score for \'${word}\': ${UserScore}`
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.clear;
  UserScore = 0;
  return(input.question("Let's play some scrabble! Enter a word: "));
};

let simpleScore = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: function (word) {
	  word = word.toUpperCase();
	  let letterPoints = "";
    UserScore = word.length
    letterPoints += `Score for \'${word}\': ${UserScore}`;
	  return letterPoints;
  }
};

let vowelBonusScore = {
  name: 'Vowel Bonus Score',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: function  (word) {  
	  word = word.toUpperCase();
	  let letterPoints = "";
    UserScore = 0;
    for (let i = 0; i < word.length; i++) {
	    switch(word[i]) {
        case 'A':
        case 'E':
        case 'I':
        case 'O':
        case 'U':
          UserScore += 3;
          break;
		    default :
          UserScore += 1;
      };
	  };
   letterPoints += `Score for \'${word}\': ${UserScore}`
	 return letterPoints;
  }
};

let scrabbleScore = {
  name: 'Scrabble Score',
  description: 'The traditional scoring algorithm.',
  scoringFunction: function  (word) {  
	  word = word.toUpperCase();
	  let letterPoints = "";
    oldScrabbleScorer(word);
    letterPoints += `Score for \'${word}\': ${UserScore}`
    return letterPoints;
  }
};

const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function scorerPrompt(word) {
  let game ;
  let games = [0,1,2];
  while(!(game in games) ) {
    console.log('Which scoring algorithm would you like to use?\n\n\n');
    for (I in games) {
        console.log(`\t${I} - ${scoringAlgorithms[I].name}: ${scoringAlgorithms[I].description}\n`);
     };
    game = input.question('\t\t\tEnter 0, 1, or 2: ');
    if (Number(game) === games[Number(game)]) {
        return scoringAlgorithms[game].scoringFunction(word);
      } else {
        console.clear();
        console.log(`Please make a valid selection.  Your entry of \'${game}\' is not valid!`)
        game = '';
   };
   return;
 };
 //game = Number(game);
 //console.log(scoringAlgorithms[number(game)].scoringFunction(initialPrompt()));
 return;
};

function transform(PtStruct) {
  //console.log("Hello Transform");
  let NwPtStruct = {' ': 0};
  let Property = '';
  let PropValue ;
  for(const Alpha in PtStruct) {
    let arr = PtStruct[Alpha];
    for(i = 0; i < arr.length; i++ ) {
      let obj = arr[i];
      for(prop in obj) {
        Property = obj[prop].toLowerCase();
        PropValue = Number(Alpha); 
        NwPtStruct[Property] = PropValue;
      };
    };
  };
  return NwPtStruct;
};



let newPointStructure = transform(oldPointStructure);

function runProgram() {
  console.log(scorerPrompt(initialPrompt()));
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

