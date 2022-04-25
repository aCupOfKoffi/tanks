'use strict'

const canvas = document.getElementById('canvas'),
    canvasContext = canvas.getContext('2d');

    let game = {
        moveUp1: false,
        moveRight1: false,
        moveDown1: false,
        moveLeft1: false,
        moveUp2: false,
        moveRight2: false,
        moveDown2: false,
        moveLeft2: false
    }

const canvasHeight = 1000,
canvasWidth = 1000;

const netq = 100;

canvas.height = canvasHeight;
canvas.width = canvasWidth;

let Player1 = {
    x: 0,
    y: 0,
    direction: 2,
    dead: false
};

let Player2 = {
    x: 9,
    y: 9,
    direction: 0,
    dead: false
};

let bullet1 = {
    x: -100,
    y: -100
}

let bullet2 = {
    x: -100,
    y: -100
}

let obstacles = [
    {
        x: 1,
        y: 1,
        block: 1
    },
    {
        x: 1,
        y: 0,
        block: 2
    },
    {
        x: 0,
        y: 3,
        block: 1
    },
    {
        x: 0,
        y: 4,
        block: 3
    },
    {
        x: 2,
        y: 3,
        block: 2

    },
    {
        x: 2,
        y: 2,
        block: 3
    },
    {
        x: 2,
        y: 5,
        block: 1
    },
    {
        x: 1,
        y: 6,
        block: 5
    },
    {
        x: 1,
        y: 7,
        block: 5
    },
    {
        x: 2,
        y: 1,
        block: 3
    },
    {
        x: 1,
        y: 8,
        block: 5
    },
    {
        x: 2,
        y: 6,
        block: 1
    },
    {
        x: 3,
        y: 9,
        block: 1
    },
    {
        x: 3,
        y: 8,
        block: 1
    },
    {
        x: 2,
        y: 0,
        block: 5
    },
    {
        x: 4,
        y: 5,
        block: 3
    },
    {
        x: 4,
        y: 6,
        block: 2
    },
    {
        x: 4,
        y: 8,
        block: 4
    },
    {
        x: 4,
        y: 3,
        block: 5
    },
    {
        x: 4,
        y: 2,
        block: 4
    },
    {
        x: 4,
        y: 1,
        block: 3
    },
    {
        x: 5,
        y: 2,
        block: 2
    },
    {
        x: 5,
        y: 6,
        block: 2
    },
    {
        x: 6,
        y: 1,
        block: 1
    },
    {
        x: 6,
        y: 2,
        block: 3
    },
    {
        x: 6,
        y: 3,
        block: 3
    },
    {
        x: 6,
        y: 4,
        block: 3
    },
    {
        x: 6,
        y: 3,
        block: 1
    },
    {
        x: 6,
        y: 8,
        block: 3
    },
    {
        x: 6,
        y: 9,
        block: 3
    },
    {
        x: 7,
        y: 2,
        block: 2
    },
    {
        x: 7,
        y: 6,
        block: 2
    },
    {
        x: 7,
        y: 9,
        block: 4
    },
    {
        x: 8,
        y: 4,
        block: 5
    },
    {
        x: 8,
        y: 6,
        block: 2
    },
    {
        x: 8,
        y: 7,
        block: 2
    },
    {
        x: 9,
        y: 2,
        block: 3
    },
]

let tankUp1 = new Image();
let tankRight1 = new Image();
let tankDown1 = new Image();
let tankLeft1 = new Image();
let tankUpDead1 = new Image();
let tankDownDead1 = new Image();
let tankLeftDead1 = new Image();
let tankRightDead1 = new Image();
tankUp1.src = 'images/tank_up.png';
tankRight1.src = 'images/tank_right.png';
tankDown1.src = 'images/tank_down.png';
tankLeft1.src = 'images/tank_left.png';
tankUpDead1.src = 'images/tank_updead.png';
tankDownDead1.src = 'images/tank_downdead.png';
tankRightDead1.src = 'images/tank_rightdead.png';
tankLeftDead1.src = 'images/tank_leftdead.png';

let tankUp2 = new Image();
let tankRight2 = new Image();
let tankDown2 = new Image();
let tankLeft2 = new Image();
let tankDown2Dead = new Image();
let tankUp2Dead = new Image();
let tankLeft2Dead = new Image();
let tankRight2Dead = new Image();
tankUp2.src = 'images/tank_up2.png';
tankRight2.src = 'images/tank_right2.png';
tankDown2.src = 'images/tank_down2.png';
tankLeft2.src = 'images/tank_left2.png';
tankDown2Dead.src = 'images/tank_down2dead.png';
tankUp2Dead.src = 'images/tank_up2dead.png';
tankLeft2Dead.src = 'images/tank_left2dead.png';
tankRight2Dead.src = 'images/tank_right2dead.png';


let bg = new Image();
let cage = new Image();
let house = new Image();
let palmtree = new Image();
let cannon = new Image();
let hammer = new Image();
bg.src = 'images/main_bg.png';
cage.src = 'images/block1.png';
house.src = 'images/block2.png';
palmtree.src = 'images/block3.png';
cannon.src = 'images/block4.png';
hammer.src = 'images/block5.png';


window.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        Player1.direction = 0;
        game.moveUp1 = true;
    }
    if (event.key === 'a') {
        Player1.direction = 3;
        game.moveLeft1 = true;
    }    
    if (event.key === 's') {
        Player1.direction = 2;
        game.moveDown1 = true;
    }
    if (event.key === 'd') {
        Player1.direction = 1;
        game.moveRight1 = true;
    }
    if (event.key === 'f') {
        shoot1();
    }
    
    if (event.key === 'ArrowUp') {
        Player2.direction = 0;
        game.moveUp2 = true;
    }
    if (event.key === 'ArrowLeft') {
        Player2.direction = 3;
        game.moveLeft2 = true;
    }    
    if (event.key === 'ArrowDown') {
        Player2.direction = 2;
        game.moveDown2 = true;
    }
    if (event.key === 'ArrowRight') {
        Player2.direction = 1;
        game.moveRight2 = true;
    }
    if (event.key === 'j') {
        shoot2();
    }
});

function shoot1() {
    if (Player1.direction === 0){
        bullet1.x = Player1.x;
        for (let i = Player1.y; i >= 0; i--) {
            bullet1.y = i;
            if ((Player2.y === bullet1.y) && (Player2.x === bullet1.x)){
                Player2.dead = true;
                console.log('dead2');
            }
        }
    }

    if (Player1.direction === 1){
        bullet1.y = Player1.y;
        for (let i = Player1.x; i < 10; i++) {
            bullet1.x = i;
            if ((Player2.x === bullet1.x) && (Player2.y === bullet1.y)){
                Player2.dead = true;
                console.log('dead2');
            }
        }
    }

    if (Player1.direction === 2){
        bullet1.x = Player1.x;
        for (let i = Player1.y; i < 10; i++) {
            bullet1.y = i;
            if ((Player2.y === bullet1.y) && (Player2.x === bullet1.x)) {
                Player2.dead = true;
                console.log('dead2');
            }
        }
    }
    
    if (Player1.direction === 3){
        bullet1.y = Player1.y;
        for (let i = Player1.x; i >= 0; i--) {
            bullet1.x = i;
            if ((Player2.x === bullet1.x) && (Player2.y === bullet1.y)) {
                Player2.dead = true;
                console.log('dead2');
            }

        }
    }
}

function shoot2() {
    if (Player2.direction === 0){
        bullet2.x = Player2.x;
        for (let i = Player2.y; i >= 0; i--) {
            bullet2.y = i;
            if ((Player1.y === bullet2.y) && (Player1.x === bullet2.x)) {
                Player1.dead = true;
                console.log('dead1');
            }
        }
    }

    if (Player2.direction === 1){
        bullet2.y = Player2.y;
        for (let i = Player2.x; i < 10; i++) {
            bullet2.x = i;
            if ((Player1.x === bullet2.x) && (Player1.y === bullet2.y)) {
                Player1.dead = true;
                console.log('dead1');
            }
        }
    }

    if (Player2.direction === 2){
        bullet2.x = Player2.x;
        for (let i = Player2.y; i < 10; i++) {
            bullet2.y = i;
            if ((Player1.y === bullet2.y) && (Player1.x === bullet2.x)) {
                Player1.dead = true;
                console.log('dead1');
            }
        }
    }
    
    if (Player2.direction === 3){
        bullet2.y = Player2.y;
        for (let i = Player2.x; i >= 0; i--) {
            bullet2.x = i;
            if ((Player1.x === bullet2.x) && (Player1.y === bullet2.y)) {
                Player1.dead = true;
                console.log('dead1');
            }

        }
    }
}

function updateFrame() {
    for (let i = 0; i < obstacles.length; i++) {
        if ((Player1.y - 1 === obstacles[i].y) && (Player1.x === obstacles[i].x)) {
            game.moveUp1 = false;
        }
        if ((Player1.y + 1 === obstacles[i].y) && (Player1.x === obstacles[i].x)) {
            game.moveDown1 = false;
        }
        if ((Player1.x - 1 === obstacles[i].x) && (Player1.y === obstacles[i].y)) {
            game.moveLeft1 = false;
        }
        if ((Player1.x + 1 === obstacles[i].x) && (Player1.y === obstacles[i].y)) {
            game.moveRight1 = false;
        }

        if ((Player2.y - 1 === obstacles[i].y) && (Player2.x === obstacles[i].x)) {
            game.moveUp2 = false;
        }
        if ((Player2.y + 1 === obstacles[i].y) && (Player2.x === obstacles[i].x)) {
            game.moveDown2 = false;
        }
        if ((Player2.x - 1 === obstacles[i].x) && (Player2.y === obstacles[i].y)) {
            game.moveLeft2 = false;
        }
        if ((Player2.x + 1 === obstacles[i].x) && (Player2.y === obstacles[i].y)) {
            game.moveRight2 = false;
        }
    }

    if ((Player1.y > 0) && (game.moveUp1)) {
        Player1.y--;
        game.moveUp1 = false;
    }
    if ((Player1.x > 0) && (game.moveLeft1)) {
        Player1.x--;
        game.moveLeft1 = false;
    }
    if ((Player1.y < 9) && (game.moveDown1)) {
        Player1.y++;
        game.moveDown1 = false;
    }
    if ((Player1.x < 9) && (game.moveRight1)) {
        Player1.x++;
        game.moveRight1 = false;
    }

    if ((Player2.y > 0) && (game.moveUp2)) {
        Player2.y--;
        game.moveUp2 = false;
    }
    if ((Player2.x > 0) && (game.moveLeft2)) {
        Player2.x--;
        game.moveLeft2 = false;
    }
    if ((Player2.y < 9) && (game.moveDown2)) {
        Player2.y++;
        game.moveDown2 = false;
    }
    if ((Player2.x < 9) && (game.moveRight2)) {
        Player2.x++;
        game.moveRight2 = false;
    }


};

function drawFrame() {

    canvasContext.clearRect(0,0,canvasWidth, canvasHeight);
    canvasContext.drawImage(bg, 0, 0);

    for (let i = 0; i < obstacles.length; i++) {
        if(obstacles[i].block === 1) {
            canvasContext.drawImage(cage, obstacles[i].x * netq, obstacles[i].y * netq);
        }
        if(obstacles[i].block === 2) {
            canvasContext.drawImage(house, obstacles[i].x * netq, obstacles[i].y * netq);
        }
        if(obstacles[i].block === 3) {
            canvasContext.drawImage(palmtree, obstacles[i].x * netq, obstacles[i].y * netq);
        }
        if(obstacles[i].block === 4) {
            canvasContext.drawImage(cannon, obstacles[i].x * netq, obstacles[i].y * netq);
        }
        if(obstacles[i].block === 5) {
            canvasContext.drawImage(hammer, obstacles[i].x * netq, obstacles[i].y * netq);
        }
    }

    if (Player1.dead === false) {
        if (Player1.direction === 0){
            canvasContext.drawImage(tankUp1, Player1.x * netq, Player1.y * netq);
        }
        if (Player1.direction === 1){
            canvasContext.drawImage(tankRight1, Player1.x * netq, Player1.y * netq);
        }
        if (Player1.direction === 2){
            canvasContext.drawImage(tankDown1, Player1.x * netq, Player1.y * netq);
        }
        if (Player1.direction === 3){
            canvasContext.drawImage(tankLeft1, Player1.x * netq, Player1.y * netq);
        }
    }
    


    if (Player2.dead === false) {
        if (Player2.direction === 0){
            canvasContext.drawImage(tankUp2, Player2.x * netq, Player2.y * netq);
        }
        if (Player2.direction === 1){
            canvasContext.drawImage(tankRight2, Player2.x * netq, Player2.y * netq);
        }
        if (Player2.direction === 2){
            canvasContext.drawImage(tankDown2, Player2.x * netq, Player2.y * netq);
        }
        if (Player2.direction === 3){
            canvasContext.drawImage(tankLeft2, Player2.x * netq, Player2.y * netq);
        }
    }
    

    // for (let i = 0; i < obstacles.length; i++) {
    //     canvasContext.strokeStyle = 'red';
    //     canvasContext.strokeRect(obstacles[i].x * netq, obstacles[i].y * netq, netq, netq);
    // }

}

function play() {
    if ((Player1.dead === false) && (Player2.dead == false)) {
        updateFrame();
        drawFrame()
        requestAnimationFrame(play);
    } else {
        if (Player1.dead) {
            if (Player1.direction === 0){
                canvasContext.drawImage(tankUpDead1, Player1.x * netq, Player1.y * netq);
            }
            if (Player1.direction === 1){
                canvasContext.drawImage(tankRightDead1, Player1.x * netq, Player1.y * netq);
            }
            if (Player1.direction === 2){
                canvasContext.drawImage(tankDownDead1, Player1.x * netq, Player1.y * netq);
            }
            if (Player1.direction === 3){
                canvasContext.drawImage(tankLeftDead1, Player1.x * netq, Player1.y * netq);
            }
        } else {
            if (Player2.direction === 0){
                canvasContext.drawImage(tankUp2Dead, Player2.x * netq, Player2.y * netq);
            }
            if (Player2.direction === 1){
                canvasContext.drawImage(tankRight2Dead, Player2.x * netq, Player2.y * netq);
            }
            if (Player2.direction === 2){
                canvasContext.drawImage(tankDown2Dead, Player2.x * netq, Player2.y * netq);
            }
            if (Player2.direction === 3){
                canvasContext.drawImage(tankLeft2Dead, Player2.x * netq, Player2.y * netq);
            }
        }
        canvasContext.font = '32px Arial';
        canvasContext.fillStyle = 'white';
        canvasContext.fillText('Game over', canvasWidth / 2, canvasHeight / 2);
        console.log('end');
    }

};


    play();
