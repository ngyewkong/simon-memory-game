var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown( function() {
    if (started === false) {
        $("#level-title").text("Level " + level);
        nextSequence();

        started = true;
    }

});

$('.btn').on("click", function(event) {
    console.log(event.currentTarget);
    console.log(this);
    var userChosenColour = $(this).attr("id");
    var userChosenColour1 = $(event.currentTarget).attr("id");
    console.log(userChosenColour);
    console.log(userChosenColour1);

    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1); // -1 as array counting start from 0 hence supplying the correct position
    
});

function nextSequence() {
    userClickedPattern = []; //empty the array to restart the user pattern

    level ++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour) {
    $("#"+ currentColour).addClass("pressed"); 
    setTimeout( function() {
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
    
};

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log(gamePattern[currentLevel]);
        console.log(userClickedPattern[currentLevel]);

        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout( function() {
                nextSequence();

            }, 1000);
        }
    } else {
            console.log("Failed");
            console.log(userClickedPattern);
            console.log(gamePattern);
            playSound("wrong");
            $("body").addClass("game-over");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            $('h1').text("Game Over, Press Any Key to Restart");

            //calls startover when user is wrong to reset
            startOver();
        }
    };

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};





