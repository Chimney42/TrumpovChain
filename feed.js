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

    clean(txt) {
        txt = txt.replace(/&amp;/g, '&');
        txt = txt.replace(/http:.+|https:.+/g, '');
        txt = txt.replace(/\(/g, '');
        txt = txt.replace(/\)/g, '');
        txt = txt.replace(/"/g, '');
        return txt;
    }

    getTweets() {
        const params = {screen_name: this.handle, exclude_replies: true, include_rts: false, count: 200, trim_user: true};

        return new Promise((resolve, reject) => {
            this.client.get('statuses/user_timeline', params, (error, tweets, response) => {
                if (!error) {
                    tweets = tweets.map(tweet => {
                        return tweet.text;
                    });
                    tweets = tweets.map(this.clean);
                    resolve(tweets);
                } else {
                    reject(error);
                }
            });
        });
    }
}

module.exports = Feed;

