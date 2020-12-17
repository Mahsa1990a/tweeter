//This file is responsible for character counter.

//alert("helloooo!"); for testing if my js file is working well

//Add this to file to ensure the DOM has loaded
//$(document).ready runs a callback when the DOM is ready to be manipulated with jQuery
$(document).ready(function() {
  
  //console.log("Hii");
  //console.log(document);
  //console.log($(document).ready)
  $("textarea").on("keyup", onKeyUp);
});

const onKeyUp = function() {
    //console.log("This: ", this); //this -> <textarea ...></textarea>
  const count = $(this).val().length;
  //console.log("count", count); //it increases number of characters that I type(start from 0 so we need 140-count)
  const counter = 140 - count;
  //target is output that has 140 counter:
  $("output").text(counter); //it shows decreasing 140
  //or $(this).siblings().children(".counter").text(counter);

  if (counter < 0) {
    $("output").addClass("counterErr");
  } else {
    $("output").removeClass("counterErr");
  }
};