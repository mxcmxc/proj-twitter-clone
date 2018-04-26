/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//=============Render and Load Posted Tweets=============//

function createTweetElement(tweetData) {
  let $tweet = $('<article>').addClass('tweet');

  //create posted tweet header
  let $header = $('<header>');
  // user avatar
  $('<img/>')
    .addClass('avatar')
    .attr('src', tweetData.user.avatars.small)
    .appendTo($header);
  // user name
  $('<span>')
    .addClass('name')
    .text(tweetData.user.name)
    .appendTo($header);
  // user handle
  $('<span>')
    .addClass('handle')
    .text(tweetData.user.handle)
    .appendTo($header);

  //create posted tweet body
  let $body = $('<div>')
    .addClass('tweet-body')
    .text(tweetData.content.text);

  //create posted tweet footer
  let $footer = $('<footer>');
  // post timestamp
  $('<span>')
    .addClass('timestamp')
    .text(postTime(tweetData.created_at))
    .appendTo($footer);
  // button area
  let $buttonIconsArea = $('<div>')
    .addClass('button-icons-area')
    .appendTo($footer);
  // flag button
  $('<i>')
    .addClass('fas')
    .addClass('fa-flag')
    .appendTo($buttonIconsArea);
  // retweet button
  $('<i>')
    .addClass('fas')
    .addClass('fa-retweet')
    .appendTo($buttonIconsArea);
  // like button
  $('<i>')
    .addClass('fas')
    .addClass('fa-heart')
    .appendTo($buttonIconsArea);

  //append posted tweet header, body and footer
  $tweet.append($header).append($body).append($footer);

  return ($tweet);
}


function renderTweets(data) {
  $('#tweets-container').empty();
  for(let i = 0; i < data.length; i++) {
    let $tweet = createTweetElement(data[i]);
    $('#tweets-container').prepend($tweet);
  }
}

//=============AJAX Requests=============//

// Ajax to handle GET request to fetch tweets from database
function loadTweets() {
  $.ajax({
    url: '/tweets/',
    method: 'GET'
  })
  .done(function (postedTweet) {
    renderTweets(postedTweet);
  })
  .fail(function(postedTweet) {
    console.log("Server not responding");
    throw "Request failed";
  });
}

// Ajax request to handle to POST a new tweet
function postTweet() {
  $.ajax({
    url: '/tweets/',
    method: 'POST',
    data: $(".composer-form-textarea").serialize() //turns the form data into a query string. This serialized data will be sent to the server in the POST request body
  })
  .done(function() {
    loadTweets();
  })
  .fail(function() {
    console.log("There was an error posting to the site");
    throw "Request failed";
  });
}

//=============New Tweet Form Validation=============//
//prevent posting (ajax request? currently allows to post.)
 function validateTweet() {
  // check data is not empty or null
  if($(".composer-form-textarea").val() === "" || ($("composer-form-textarea") === null)) {
    alert('Tweet cannot be empty.');
    //MISSING need to reset alert for new tweet container
    $('.counter').text('140');
  //check data is not over limit
  } else if ($(".composer-form-textarea").val().length > 140) {
    alert('Tweet cannot be more than 140 characters');
    //MISSING need to reset new tweet counter!
  }
 }

//=============Bind Compose Button To Toggle New Tweet Form==========//

function composeButtonToggle() {
  // toggle compose tweet container up/down when nav bar compose button is clicked
  $('#compose-btn').on('click', function (event) {
    //hide the compose tweet container on page load
    $('.new-tweet').slideToggle("fast");
    $('.composer-form-textarea').focus();
  });
}

//=============Execute Document=============//

$(document).ready(() => {
  loadTweets();
  composeButtonToggle();
  $("#composer-form").on("submit", function(event) {
    event.preventDefault();
    validateTweet();
    postTweet();
  });
});

