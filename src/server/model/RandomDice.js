class RandomDice {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * (this.numSides || 6));
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }

  biggerDice() {
    return new RandomDice(this.numSides + 1);
  }
}

module.exports = RandomDice;
