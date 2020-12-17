//This file is responsible for character counter.

//alert("helloooo!"); for testing if my js file is working well

//$(document).ready runs a callback when the DOM is ready to be manipulated with jQuery
$(document).ready(function() {

  $("textarea").on("keyup", onKeyUp);

});

const onKeyUp = function() {
  //console.log("This: ", this); //this -> <textarea ...></textarea>
  const count = $(this).val().length;
  //console.log("count", count); //it increases number of characters that I type(start from 0 so we need 140-count)
  const counter = 140 - count;

  $(this).siblings().children(".counter").text(counter);
  //or  $("output").text(counter); //it shows decreasing 140
  

  if (counter < 0) {
    $(this).siblings().children(".counter").addClass("counterErr");
  } else {
    $(this).siblings().children(".counter").removeClass("counterErr");
  }
};