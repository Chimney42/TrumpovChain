const Markov = require('./markov');

class Trumpov {
    constructor() {
        this.markov = new Markov();
        this.markov.order = 1;
    }

    learn(texts) {
        texts.forEach(txt => this.markov.learn(txt));
    }

    setSeperator(sep) {
        this.markov.separator = sep;
    }

    setOrder(order) {
        this.markov.order = order;
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
