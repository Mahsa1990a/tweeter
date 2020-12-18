/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  //To avoid XSS(Cross-Site Scripting)
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //responsible for taking an arr of tweet obj and append(but in tweeter prepend) each one to the target
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
        <span class="tweet-text">${escape(text)}</span>
        <div><hr class="line"></div>
        <footer>
          <span class="time">${time}</span>
          <div class="button">
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
  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  //$('#tweets-container').append($tweet); 

  //For animated error msg
  const alertMessage = function (message) {
    $('.alert').text(message);
    /*animate the bar*/
    $('.alert').slideDown(() => {
      setTimeout(() => {
        $('.alert').slideUp(() => {
          $(this).remove()
        });
      }, 3000);
    });
  };
  
  const submitNewTweet = function($form){
    const $tweetBox = $form.children("#tweet-text");
    const tweetContent = $tweetBox.val().trim();

    if(!tweetContent || tweetContent === "") {
      alertMessage("⚠︎ Missing Text! ⚠︎");
    } else if (tweetContent.length > 140) {
      alertMessage("⚠︎ TOO long. Plz rspct our arbitary limit of 140 chars! ⚠︎");
    } else {
      //creat AJAX POST request
      $.ajax({
        method: "POST",
        url: "/tweets",
        //data: {text: tweetContent}
        data: $form.serialize()
      })
      .then(response => {
        console.log("response", response);
        $("#tweet-text").val(''); //to put cursor back to begining

        $(".counter").text('140');
        loadTweets(); //loading tweets from Data
        
      })
      .catch(err => console.log("ERORR: ", err))
    }
  }
  
  // handling new tweet form submit
  $("form").on("submit", function(event){
    
    //prevent the default form submission behaviour
    event.preventDefault();
    console.log("Checking validity");
    
    submitNewTweet($(this));
  });

  //Is responsible for fetching tweets from the http://localhost:8080/tweets page
  const loadTweets = function() {
  //will use jQuery to make request to /tweets
    $.ajax({
      method: "GET",
      url: "/tweets"
    })
    .then(tweets => {
      renderTweets(tweets);
    })
  }
  loadTweets();
  // shows/hides new tweet section when clicked the arrow icon on navbar
  $("nav i").on('click', function() {
    $(".new-tweet").slideToggle();
    $('textarea').focus();
  });
});
