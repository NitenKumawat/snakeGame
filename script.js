const foodTypes = [
    { backgroundImage: 'url("img/apple.png")', points: 10, sound: new Audio("sound/apple.mp3") },    // Apple
    { backgroundImage: 'url("img/banana.png")', points: 15, sound: new Audio("sound/banana.mp3") },  // Banana
    { backgroundImage: 'url("img/grape.png")', points: 20, sound: new Audio("sound/grapes.mp3") },    // Grape
    { backgroundImage: 'url("img/orange.png")', points: 25, sound: new Audio("sound/grapes.mp3") }   // Orange
];


// Game Constants & Variables





let input_direction= { x: 0, y: 0 };

const gameOver_sound = new Audio("sound/gameover.mp3");
const move_sound = new Audio("sound/moving.mp3");
const game_sound = new Audio("sound/game_sound.mp3");
let speed = 10;
let score=0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

food = { x:6, y:4 ,
    type: foodTypes[Math.floor(Math.random() * foodTypes.length)]};

// Game functions
function main(current_time) {
    window.requestAnimationFrame(main);
    // console.log(current_time);

    if ((current_time - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = current_time;


    gameEngine();

}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}


function gameEngine() {
    // updating
    if (isCollide(snakeArr)) {
        
        gameOver_sound.play();
        game_sound.pause();
        input_direction = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        game_sound.play();
        score = 0;
    }

    // eating logic for different food types
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        food.type.sound.play(); // Play the sound of the food type
        score += food.type.points; // Increase score based on the food type

        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscorePrint.innerHTML = "HiScore: " + hiscoreval;
        }
        scorePrint.innerHTML = "Score: " + score;

        // Grow the snake
        snakeArr.unshift({x: snakeArr[0].x + input_direction.x, y: snakeArr[0].y + input_direction.y});

        // Generate new food with a random type
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()), 
            y: Math.round(a + (b - a) * Math.random()),
            type: foodTypes[Math.floor(Math.random() * foodTypes.length)] // New random food type
        };
    }

    // moving
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += input_direction.x;
    snakeArr[0].y += input_direction.y;

    // snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // food
  
foodElement = document.createElement('div');
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart = food.x;
foodElement.style.backgroundImage = food.type.backgroundImage; // Set the background image for the food
foodElement.style.backgroundSize = 'cover'; // Ensure the image covers the whole element
foodElement.style.backgroundPosition = 'center'; // Center the image
foodElement.classList.add('food');
board.appendChild(foodElement);

}


// main logics
game_sound.play();
let hiscore = localStorage.getItem("hiscore");

if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscorePrint.innerHTML = "HiScore: " + hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{game_sound.play();
    input_direction= {x:0,y:1}//start game
    move_sound.play();
    switch(e.key){
        case "ArrowUp":
        
        input_direction.x=0;
        input_direction.y=-1;
        break;
        case "ArrowDown":
       
        input_direction.x=0;
        input_direction.y=1;
        break;
        case "ArrowLeft":
        
        input_direction.x=-1;
        input_direction.y=0;
        break;
        case "ArrowRight":
     
        input_direction.x=1;
        input_direction.y=0;
        break;
    }
});

