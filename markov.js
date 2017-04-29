class Markov {
    constructor() {
        this.memory = {};
        this.separator = '';
    }

    learn(txt) {
        var mem = this.memory;
        this.breakText(txt, learnPart);

        function learnPart (key, value) {
            if (!mem[key]) {
                mem[key] = [];
            }
            mem[key].push(value);

            return mem;
        }
    }

    ask(seed) {
        //beginning-of-word
        if (!seed) {
            seed = '';
        }

        return this.step(seed, [seed]).join(this.separator);
    }

    step(state, ret) {
        var nextAvailable = this.memory[state] || [''];
        var next = nextAvailable[Math.floor(Math.random()*nextAvailable.length)];

        //we don't have anywhere to go
        if (!next) {
            return ret;
        }

        ret.push(next);
        return this.step(next, ret);
    }

    breakText(txt, cb) {
        var parts = txt.split(this.separator),
            prev = '';

        parts.forEach(step);
        cb(prev, ''); //end-of-word

        function step (next) {
            cb(prev, next);
            prev = next;
        }
    }
}

module.exports = Markov;