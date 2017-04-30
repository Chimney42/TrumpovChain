const Markov = require('./markov');

class Trumpov {
    constructor() {
        this.markov = new Markov();
    }
    learn(text) {
        this.markov.learn(text)
    }
    generateText() {
        let satisfied = false;
        let generated = '';
        while (!satisfied) {
            generated = this.markov.ask();

            const lastWord = generated.split(' ').pop();
            const lastChar = generated.slice(-1);
            if (lastChar === '.' || lastChar === '!' || lastChar === '?' || lastWord.includes('#')) {
                satisfied = true;
            }
        }
        return generated;
    };
}

module.exports = Trumpov;
