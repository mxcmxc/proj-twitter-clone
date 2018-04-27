"use strict";
//*** when given a db, provides functions that use it to store and retrieve tweets ***//

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      // get the tweets collection, inserts the document newTweet;
      // result equals newTweet; and has a callback to handle errors
      db.collection('tweets').insertOne(newTweet).then(function() {
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      // .find() gets all tweets. returns a cursor (pointer to the result set of a query)
      // toArray() makes into an array
      // callback(err, result)
      db.collection('tweets').find().toArray().then((tweets) => {
        callback(null, tweets.sort(sortNewestFirst));
      });

    }
  };
};