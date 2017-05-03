const async = require('async');
const express = require('express');
const Feed = require('./src/feed');
const Trumpov = require('./src/trumpov');
const path = require('path');
const feed = new Feed();
const trumpov = new Trumpov();
let feedComplete = false;
let allTweets = [];
let count = 0;
let max_id = null;

const app = express();
app.listen(3000, () => {
    console.log('Dondrey Trumpov reporting for duty!')
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname + '/web/app.js'));
});

app.get('/speak/', (req, res) => {
    async.whilst(
        () => !feedComplete,
        next => {
            feed.getTweets(max_id)
                .then(tweets => {
                    max_id = tweets[tweets.length-1].id;
                    allTweets = allTweets.concat(tweets);
                    count = count + tweets.length;
                    if (count >= 1000) {
                        feedComplete = true;
                    }
                    next();
                })
        },
        () => {
            const texts = allTweets.map(tweet => {
                return tweet.text
            });
            trumpov.learn(texts);
            const generated = [];
            for (let i = 0; i <= 10; i++) {
                generated.push(trumpov.generateText());
            }
            res.send(generated)
        }
    );
});




