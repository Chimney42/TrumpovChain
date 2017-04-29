class Markov {
    constructor() {
        this.memory = {};
        this.separator = ' ';
        this.order = 1;
    }

    genInitial() {
        const ret = [];

        for (let i = 0; i < this.order; i++) {
            ret.push('');
        }

        return ret;
    }

    learn(txt) {
        const mem = this.memory;
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
            seed = this.genInitial();
        }

        return seed.concat(this.step(seed, [])).join(this.separator);
    }

    step(state, ret) {
        const nextAvailable = this.memory[state] || [''];
        const next = nextAvailable[Math.floor(Math.random()*nextAvailable.length)];

        //we don't have anywhere to go
        if (!next) {
            return ret;
        }

        ret.push(next);

        const nextState = state.slice(1);
        nextState.push(next);
        return this.step(nextState, ret);
    }

    breakText(txt, cb) {
        const parts = txt.split(this.separator);
        let prev = this.genInitial();

        parts.forEach(step);
        cb(prev, ''); //end-of-word

        function step (next) {
            cb(prev, next);
            prev.shift();
            prev.push(next);
        }
    }
}

module.exports = Markov;