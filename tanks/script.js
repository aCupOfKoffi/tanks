'use strict'

const canvas = document.getElementById('canvas'),
    canvasContext = canvas.getContext('2d');

    let game = {
        moveUp: false,
        moveRight: false,
        moveDown: false,
        moveLeft: false
    }

const canvasHeight = 1000,
canvasWidth = 1000;

const netq = 100;

canvas.height = canvasHeight;
canvas.width = canvasWidth;

let player = {
    x: 0,
    y: 0,
    direction: 1,
    shot: false
};

let obstacles = [
    {
        x: 1,
        y: 1
    },
    {
        x: 1,
        y: 0
    },
    {
        x: 0,
        y: 3
    },
    {
        x: 0,
        y: 4
    },
    {
        x: 2,
        y: 3
    },
    {
        x: 3,
        y: 3
    },
    {
        x: 2,
        y: 2
    },
    {
        x: 1,
        y: 0
    },
    {
        x: 1,
        y: 0
    },
    {
        x: 1,
        y: 0
    },
]

let tankUp = new Image();
let tankRight = new Image();
let tankDown = new Image();
let tankLeft = new Image();
tankUp.src = 'images/tank_up.png';
tankRight.src = 'images/tank_right.png';
tankDown.src = 'images/tank_down.png';
tankLeft.src = 'images/tank_left.png';


window.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        player.direction = 0;
        game.moveUp = true;
        
    }
    if (event.key === 'a') {
        player.direction = 3;
        game.moveLeft = true;
        
    }    
    if (event.key === 's') {
        player.direction = 2;
        game.moveDown = true;
        
    }
    if (event.key === 'd') {
        player.direction = 1;
        game.moveRight = true;
        
        
    }
});



function updateFrame() {
    for (let i = 0; i < obstacles.length; i++) {
        if ((player.y - 1 === obstacles[i].y) && (player.x === obstacles[i].x)) {
            game.moveUp = false;
        }
        if ((player.y + 1 === obstacles[i].y) && (player.x === obstacles[i].x)) {
            game.moveDown = false;
        }
        if ((player.x - 1 === obstacles[i].x) && (player.y === obstacles[i].y)) {
            game.moveLeft = false;
        }
        if ((player.x + 1 === obstacles[i].x) && (player.y === obstacles[i].y)) {
            game.moveRight = false;
        }
    }

    if ((player.y > 0) && (game.moveUp)) {
        player.y--;
        game.moveUp = false;
    }
    if ((player.x > 0) && (game.moveLeft)) {
        player.x--;
        game.moveLeft = false;
    }
    if ((player.y < 9) && (game.moveDown)) {
        player.y++;
        game.moveDown = false;
    }
    if ((player.x < 9) && (game.moveRight)) {
        player.x++;
        game.moveRight = false;
    }
};

function drawFrame() {
    canvasContext.clearRect(0,0,canvasWidth, canvasHeight);
    if (player.direction === 0){
        canvasContext.drawImage(tankUp, player.x * netq, player.y * netq);
    }
    if (player.direction === 1){
        canvasContext.drawImage(tankRight, player.x * netq, player.y * netq);
    }
    if (player.direction === 2){
        canvasContext.drawImage(tankDown, player.x * netq, player.y * netq);
    }
    if (player.direction === 3){
        canvasContext.drawImage(tankLeft, player.x * netq, player.y * netq);
    }
    for (let i = 0; i < obstacles.length; i++) {
        canvasContext.strokeStyle = 'red';
        console.log(obstacles[i].x, obstacles[i].y)
        canvasContext.strokeRect(obstacles[i].x * netq, obstacles[i].y * netq, netq, netq);
    }
}

function play() {
    updateFrame();
    drawFrame()
    requestAnimationFrame(play);
};

play();