const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function () {
    if (!started) {

        $("#level-title").text(`Level ${level}`);
        nextSquance();
        started = true;
    }
});

$(document).click(function () {
    if (!started) {

        $("#level-title").text(`Level ${level}`);
        nextSquance();
        started = true;
    }
});

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1)

});

function nextSquance() {

    userClickedPattern = []
    level++;
    $("#level-title").text(`Level ${level}`)

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChoseColors = buttonColors[randomNumber];
    gamePattern.push(randomChoseColors);

    $("#" + randomChoseColors)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);

    playSound(randomChoseColors);

};

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(curentColor) {

    $(`#${curentColor}`).addClass("pressed")
    setTimeout(function () {
        $("#" + curentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(curentLevel) {
    if (gamePattern[curentLevel] === userClickedPattern[curentLevel]) {
        console.log("Succes")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSquance();
            }, 1000);
        }
    } else {
        console.log("Wrong")
        let audio = new Audio ("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over")
        },200);
        $("h1").text("GAME OVER!!, Press any key to restart")
        startOver()
    }
}

const startOver = () => {
  level = 0;
  gamePattern = []
  started = false;
}
