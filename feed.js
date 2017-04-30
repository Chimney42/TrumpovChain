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

        this.params = {
            screen_name: 'realDonaldTrump',
            trim_user: true,
            exclude_replies: true,
            include_rts: false,
            count: 200
        };


    }

    clean(txt) {
        let cleaned = txt.replace(/&amp;/g, '&');
        cleaned = cleaned.replace(/http:.+|https:.+/g, '');
        cleaned = cleaned.replace(/[(]/g, '');
        cleaned = cleaned.replace(/[)]/g, '');
        cleaned = cleaned.replace(/"/g, '');
        return cleaned;
    }

    getTweets(max_id = null) {
        if (max_id) {
            this.params.max_id = max_id;
        } else {
            delete this.params.max_id;
        }
        return new Promise((resolve, reject) => {
            this.client.get('statuses/user_timeline', this.params, (error, tweets, response) => {
                if (!error) {
                    tweets.map(tweet => {
                        return {
                            id: tweet.id,
                            text: this.clean(tweet.text)
                        }
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

