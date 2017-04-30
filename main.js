const async = require('async');
const Feed = require('./src/feed');
const Trumpov = require('./src/trumpov');

const feed = new Feed();
const trumpov = new Trumpov();
let feedComplete = false;
let allTweets = [];
let count = 0;
let max_id = null;

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
            trumpov.learn(tweet.text)
        });
        const iterations = 10;
            for (let i = 0; i <= iterations; i++) {
                console.log(trumpov.generateText());
            }
        }
);



