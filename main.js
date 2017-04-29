const Feed = require('./feed');
const Markov = require('./markov');

const feed = new Feed();
const markov = new Markov();

feed.getTweets()
    .then(tweets =>  {
        markov.separator = ' ';
        tweets.map(tweet => {
            markov.learn(tweet)
        });
        console.log(markov.ask());
    });
