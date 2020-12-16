/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // const tweetData =  {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //   "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //   "created_at": 1461116232227
  // }

  //we don't neet data content anymore, it weill take data from server
  const data = [];
  
  //responsible for taking an arr of tweet obj and append(prepend) each one to the target
  const renderTweets = function(tweets) {
  
    for (let tweetOne of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweetOne));
    }
  };
  
  const createTweetElement = function(tweet) {
    const name = tweet.user.name;
    const handle = tweet.user.handle;
    const text = tweet.content.text;
    const avatar = tweet.user.avatars;
    const time = new Date(tweet.created_at).toLocaleString();
  
    let $tweet = `
    <section id="tweets-container">
      <article class="tweet">
        <header>
          <div>
            <span class="avatar"><img src="${avatar}">
            <span class="name">${name}</span>
          </div>
          <span class="alias"><h5>${handle}</h5></span>
        </header>
        <span class="tweet-text">${text}</span>
        <div><hr class="line"></div>
        <footer>
          <span class="time">${time}</span>
          <div>
            <button type="retweet"><i class="fas fa-flag"></i></button>
            <button type="flag"><i class="fas fa-retweet"></i></button>
            <button type="like"><i class="fas fa-heart"></i></button>
          </div>
        </footer>
      </article>
    </section>
    `
    return $tweet;
  };
  //Test:
  //const $tweet = createTweetElement(tweetData);
  //$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  
  renderTweets(data);

  //creat AJAX POST request
  $("#submit-tweet").on("submit", function(event){ //target form
    
    const $tweetBox = $(this).children("#tweet-text");
    const tweetContent = $tweetBox.val();
    //Since we want to handle the form submission ourselves,
    //and send the POST request asynchronously,
    //we want to prevent the default form submission behaviour.
    event.preventDefault();
    
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: {text: tweetContent}
      //data: $(this).serialize()
    })
    .then(response => {
      console.log("response", response);
      $("#tweet-text").val(''); //to put cursor back to begining
      loadTweets(); //loading tweets from Data
    })
    .catch(err => console.log("ERORR: ", err))
  });

  //Is responsible for fetching tweets from the http://localhost:8080/tweets page
  const loadTweets = function() {
  //   //will use jQuery to make request to /tweets
    $.ajax({
      method: "GET",
      url: "/tweets"
    })
    .then(tweets => {
      renderTweets(tweets);
    })
  }
  loadTweets();
});
