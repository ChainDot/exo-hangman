const fs = require("fs");
const readlineSync = require("readline-sync");
const chalk = require("chalk");
const { HANGMANPICS } = require("./hangMan");
const { logoHangman } = require("./logo");
const { wordRandomPick } = require("./utils");

class Game {
  init() {}

  run() {
    while (true) {
      // read dict.txt turn it into an array of words
      const readDict = fs.readFileSync("./dict.txt", "utf-8").split("\n");
      //console.log(readDict)

      let wordPicked = wordRandomPick(readDict);
      //console.log(wordPicked)

      // length of the random words
      let wordPickedLength = wordPicked.length;
      //console.log(wordPickedLength)

      //setup default display
      let defaultDisplay = `${"_ ".repeat(wordPickedLength)}`;

      // console.log(defaultDisplay)

      // check userInput matches random
      let arrayOfWordPicked = wordPicked.toLowerCase().split("");
      console.log(arrayOfWordPicked);

      let updateDisplay = defaultDisplay.trim().split(" ");
      // console.log(`"${updateDisplay.join(" ")}"`);

      // logo display
      console.log(chalk.yellowBright.bold(`${logoHangman}\n`));

      // welcome message
      console.log(
        chalk.yellowBright.bold(
          `${" ".repeat(10)}Welcome to Hangman Game, let's hangout!\n\n`
        )
      );

      // loop start game question
      while (true) {
        // start game
        let start = readlineSync.question(
          chalk.yellow(
            `${" ".repeat(10)}Do you want to start the game ? Y/N :\t`
          )
        );
        if (start === "y" || start === "Y") {
          break;
        } else if (start === "N" || start === "n") {
          console.log(chalk.yellowBright.bold(`\n${"#".repeat(60)}`));
          console.log(chalk.yellowBright.bold(`${" ".repeat(20)}Cheers!`));
          console.log(chalk.yellowBright.bold("#".repeat(60)));
          process.exit(1);
        } else {
          console.log(`${" ".repeat(10)}Error: enter Y/N`);
          continue;
        }
      }
      // Default display
      let init = `\n${" ".repeat(15)}"${defaultDisplay}"\n`;
      console.log(init);
      // start questions
      let score = 0;
      let counter = -1; //counter words remaining
      let countDown = HANGMANPICS.length;
      while (counter < HANGMANPICS.length - 1) {
        //TODO: Question start playing

        if (updateDisplay.join(" ") !== arrayOfWordPicked.join(" ")) {
          console.log(chalk.yellowBright(`${"#".repeat(60)}\n`));
          let readQuestion = readlineSync
            .question(chalk.yellow("lets pick a letter?\t"))
            .toLowerCase();

          let indexChoice = arrayOfWordPicked.indexOf(readQuestion);
          let arrayIndexof = [];

          if (indexChoice !== -1) {
            while (indexChoice !== -1) {
              arrayIndexof.push(indexChoice);
              indexChoice = arrayOfWordPicked.indexOf(
                readQuestion,
                indexChoice + 1
              );
            }
          } else {
            arrayIndexof.push(-1);
          }
          // console.log(arrayIndexof)
          let guess = "";
          let tmpArray = "";
          let hangManArray = [];
          for (let i = 0; i < arrayIndexof.length; i++) {
            if (arrayIndexof[i] !== -1) {
              score += 100 / wordPickedLength;
              updateDisplay.splice(arrayIndexof[i], 1, readQuestion);
              tmpArray = updateDisplay.join(" ");
              if (updateDisplay.join(" ") !== arrayOfWordPicked.join(" ")) {
                // console.log('#'.repeat(60))
                guess = chalk.greenBright(
                  `${" ".repeat(10)}Well done, let's continue!\n`
                );
                // console.log('#'.repeat(60))
              }
              if (counter !== -1) {
                hangManArray = HANGMANPICS[counter];
              }
            } else {
              counter++;
              countDown--;
              score -= 10;
              tmpArray = updateDisplay.join(" ");
              if (countDown !== 0) {
                // console.log('#'.repeat(60))
                guess = chalk.redBright(
                  `${" ".repeat(10)}Wrong guess, Let's try again\n`
                );
                // console.log('#'.repeat(60))
              }
              hangManArray = HANGMANPICS[counter];
            }
          }
          if (score >= 0) {
            console.log(`\nScore:${Math.ceil(score)} points`);
            if (score === 100) {
              console.log(`\nPerfect Score, Mate you're a freaking genius\n`);
            }
          } else {
            console.log(`\nScore: 0 points`);
          }
          console.log(`${hangManArray}\n`);
          console.log(`You have ${countDown} lives remaining\n`);
          console.log(guess);
          console.log(`${" ".repeat(15)}"${tmpArray}"\n`);

          if (counter === HANGMANPICS.length - 1) {
            console.log(chalk.magentaBright("#".repeat(60)));
            console.log(
              chalk.magentaBright(
                `${" ".repeat(15)}Answer : ${arrayOfWordPicked.join(" ")}`
              )
            );
            console.log(chalk.magentaBright("#".repeat(60)));
            console.log(chalk.redBright.bold("#".repeat(60)));
            console.log(
              chalk.redBright.bold(`${" ".repeat(15)}Game Over, you lose`)
            );
            console.log(chalk.redBright.bold("#".repeat(60)));
          }
        } else {
          // console.log(updateDisplay.join(' '))
          console.log(chalk.greenBright("#".repeat(60)));
          console.log(
            chalk.greenBright.bold(`${" ".repeat(15)}Game Over,You Won!`)
          );
          console.log(chalk.greenBright("#".repeat(60)));
          break;
        }
      }
      //TODO: Question do you to quit or to play again
      while (true) {
        let keepPlaying = readlineSync.question(
          chalk.yellowBright(`\nDo you still want to hang around ? Y/N`)
        );
        if (keepPlaying === "Y" || keepPlaying === "y") {
          break;
        } else if (keepPlaying === "N" || keepPlaying === "n") {
          console.log(chalk.yellowBright.bold(`\n${"#".repeat(60)}`));
          console.log(chalk.yellowBright.bold(`${" ".repeat(20)}Cheers!`));
          console.log(chalk.yellowBright.bold("#".repeat(60)));
          process.exit(1);
        } else {
          console.log(`Error: enter Y/N`);
          continue;
        }
      }
    }
  }
}

exports.Game = Game;
