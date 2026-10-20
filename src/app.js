'use strict';

const { checkIsValidUserInput } = require('./modules/checkIsValidUserInput');
const { generateRandomNumber } = require('./modules/generateRandomNumber');
const { getBullsAndCows } = require('./modules/getBullsAndCows');

const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function playGame() {
  const numberToGuess = generateRandomNumber();

  function askUser() {
    rl.question('Enter a 4-digit number: ', (userInput) => {
      if (!checkIsValidUserInput(userInput)) {
        process.stdout.write(
          'Invalid input. Enter 4 different digits without starting with 0.\n',
        );

        askUser();

        return;
      }

      const { bulls, cows } = getBullsAndCows(userInput, numberToGuess);

      process.stdout.write(`Bulls: ${bulls}, Cows: ${cows}\n`);

      if (bulls === 4) {
        process.stdout.write('Congratulations! You guessed the number!\n');
        rl.close();

        return;
      }

      askUser();
    });
  }

  askUser();
}

playGame();
