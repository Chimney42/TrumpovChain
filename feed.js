const config = require('./config');
const Twitter = require('twitter');

class Feed {
    constructor() {
        this.client = new Twitter({
            consumer_key: config.TWITTER_CONSUMER_KEY,
            consumer_secret: config.TWITTER_CONSUMER_SECRET,
            access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
        });
        this.handle = 'realDonaldTrump';
    }

    getTweets() {
        const params = {screen_name: this.handle, count: 50};

        return new Promise((resolve, reject) => {
            this.client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {
                    tweets = tweets.map(tweet => {
                        return tweet.text;
                    });
                    tweets = tweets.filter(tweet => {
                        return !tweet.includes('@')
                    });
                    tweets = tweets.filter(tweet => {
                        return !tweet.includes('http')
                    });
                    tweets = tweets.map(tweet => {
                        tweet = tweet.replace(/&amp;/g, '&');
                        return tweet;
                    });
                    resolve(tweets);
                } else {
                    reject(error);
                }
            });
        });
    }
}

module.exports = Feed;

