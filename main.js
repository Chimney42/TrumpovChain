const async = require('async');
const Feed = require('./feed');
const Markov = require('./markov');

const feed = new Feed();
const markov = new Markov();
let feedComplete = false;
let satisfied = false;
let allTweets = [];
let count = 0;
async.whilst(
    () => !feedComplete,
    next => {
        feed.getTweets()
        .then(tweets =>  {
            allTweets = allTweets.concat(tweets);
            count = count + tweets.length;
                if (count >= 5000) {
                    feedComplete = true;
                }
                next();
            })
    },
    () => {
        console.log(allTweets.length);
        allTweets.map(tweet => {
            markov.learn(tweet)
        });

        let generated = '';
        while (!satisfied) {
            generated = markov.ask();
            const lastWord = generated.split(' ').pop();
            const lastChar = generated.slice(-1);
            if (lastChar === '.' || lastChar === '!' || lastChar === '?' || lastWord.includes('#')) {
                satisfied = true;
            }
        }
        console.log(generated);
    }
);



