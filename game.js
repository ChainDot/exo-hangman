class Person {
  constructor(player, score) {
    this.score = score;
    this.player = player;
  }

  printPlayer() {
    console.log(`${this.player}`);
  }
  printScore() {
    console.log(`${this.score}`);
  }
}

const alice = new Person("Alice", 100);
const pierre = new Person("Pierre", 95);

alice.printPlayer();
alice.printScore();
