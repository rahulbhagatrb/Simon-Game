
var buttonColours = ["red", "blue", "green", "yellow"]; //array to store the color

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();     //calling nextSequence function to know what will be next sequence.
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); //whatever i have clicked whether right or wrong it will be stored in variable
  userClickedPattern.push(userChosenColour);    //what i have pressed put it in userClickedPattern array

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);    //calling function to check whether i have pressed right or not//
  //here -1 because we need to check index that will be less than length-1;
});

function checkAnswer(currentLevel) {

       //checking what i have pressed is matching with game pattern or not.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence(); //if length of gamepattern and userClicked arrays length is same then call for next level.
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");                                       //if things got wrong do this.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();  //setting back to normal value to start again
    }
}


//function created for generating the next random color choosen.
function nextSequence() {
  userClickedPattern = [];  //every time making it blank because everytime we need to click all the previous pattern on what we have remembered.
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); //generating random number from 0 to 3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);       //putting that random choosen colour into array which will store what gamepattern is going on

 //not using hash directly because randomchosen colour is variable to write less ccode basically.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");        //this section basically gives animation while pressing.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");   //playing different sound by their rspective name
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
