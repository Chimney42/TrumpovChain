const async = require('async');
const Feed = require('./feed');
const Markov = require('./markov');

const feed = new Feed();
const markov = new Markov();
let feedComplete = false;
let allTweets = [];
let count = 0;
let max_id = null;



const generateText = () => {
    let satisfied = false;
    let generated = '';
    while (!satisfied) {
        generated = markov.ask();

        const lastWord = generated.split(' ').pop();
        const lastChar = generated.slice(-1);
        if (lastChar === '.' || lastChar === '!' || lastChar === '?' || lastWord.includes('#')) {
            satisfied = true;
        }
    }
    return generated;
};

async.whilst(
    () => !feedComplete,
    next => {
        feed.getTweets(max_id)
            .then(tweets => {
                max_id = tweets[tweets.length-1].id;
                allTweets = allTweets.concat(tweets);
                count = count + tweets.length;
                if (count >= 2000) {
                    feedComplete = true;
                }
                next();
            })
    },
    () => {
        allTweets.forEach(tweet => {
            markov.learn(tweet.text)
        });
        const iterations = 10;
            for (let i = 0; i <= iterations; i++) {
                console.log(generateText());
            }
        }
);



