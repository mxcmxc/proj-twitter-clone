$(document).ready(() => {

  $(".new-tweet").on('keypress', "textarea", function(event) {
    //length of user tweet input ("this" is the text user entered in textarea)
    let text = $(this).val().length;
    // characters remaining
    let charsLeft = 140 - text;
    //update counter to current text length (go to parent element (form) and find the respective counter
    //set the text equal to the value calculated above)
    $counter = $(this).closest("form").find(".counter");
    $counter.text(charsLeft);
    if (charsLeft < 0) {
      $counter.addClass("counter-limit");
    } else {
      $counter.removeClass("counter-limit");
    }
  });
});
