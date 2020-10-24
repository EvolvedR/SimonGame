var buttonColors = ["red", "green", "blue", "yellow"];
var startFlag = 0;
var gamePattern = [];
var level = 0;
var userClickedPattern = [];

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut().fadeIn();
    playSound(randomChoosenColor);
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1); 
    
});

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keydown(function (event){
    var press = event.key;
    startFlag++;
    if (startFlag === 1){
    $("h1").text("Level 0");
    nextSequence();
    } 
});

function checkAnswer(currentLevel){ 
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){ 
        console.log("Sucsess");
        console.log(userClickedPattern);
        console.log(gamePattern);
        if (userClickedPattern.length === gamePattern.length){          
            setTimeout(nextSequence, 1000);    
        }
    }
    else {     
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();  
    }
}

function startOver(){
    startFlag = 0;
    level = 0;
    gamePattern = [];
}