var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
     $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel){
    if(userChoosePattern[currentLevel] == gamePattern[currentLevel]){
        console.log("Success !");
        if(userChoosePattern.length == gamePattern.length){    
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("ReCheck !");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}


function animatePress(color){
    $(color).addClass("pressed");
    setTimeout(function(){
        $(color).removeClass("pressed");
    }, 100);
}



var userChoosePattern=[];


$(".btn").click(function() {
    var elemId = $(this).attr("id");
    userChoosePattern.push(elemId);
    animatePress(`.${elemId}`);
    var music = "./sounds/"+elemId+".mp3";
    var audio = new Audio("./sounds/"+elemId+".mp3");
    audio.play();
    checkAnswer(userChoosePattern.length-1);
    idx++;
});

var idx;

function nextSequence(){
    
    userChoosePattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var idx = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[idx];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("./sounds/"+randomChosenColor+".mp3");
    audio.play();
    
}



function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}