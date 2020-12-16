/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {


const tweetData =  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}
//responsible for taking an arr of tweet obj
// const renderTweets = function(tweets) {
//   for (let tweetOne of tweets) {
//     $("#tweets-container").prepend(createTweetElement(tweetOne));
//   }
// };
// renderTweets(tweet);
const createTweetElement = function(tweet) {
  const name = tweet.user.name;
  const handle = tweet.user.handle;
  const text = tweet.content.text;
  const time = new Date(tweet.created_at).toLocaleString();

  const $tweet = `
  <section id="tweets-container">
    <article class="tweet">
      <header>
        <div>
          <i class="fas fa-user"></i>
          <span class="name">${name}</span>
        </div>
        <span class="alias"><h5>${handle}</h5></span>
      </header>
      <span class="tweet-text">${text}</span>
      <footer>
        <span>${time}</span>
        <div>
          <button type="retweet"><i class="fas fa-flag"></i></button>
          <button type="flag"><i class="fas fa-retweet"></i></button>
          <button type="like"><i class="fas fa-heart"></i></button>
        </div>
      </footer>
    </article>
  </section>
  `
  return ($tweet);
};
//Test:
const $tweet = createTweetElement(tweetData);
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
//createTweetElement(tweet);
});
