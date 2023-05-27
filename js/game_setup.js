// Game Setup

// canvas setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
c.fillRect(0,0, canvas.width, canvas.height);
// player movement settings
const gravity = 0.2; // pull on objects after jumping
const horizontal_vel = 7; // aka speed left/right
const vertical_vel = 5; // jumping 

player1_healthbar = 100;
player2_healthbar = 100;

player1_hitbar = 100;
player2_hitbar = 100;

// Key Flags 
const action_keys = {
    a: { pressed: false},
    d: { pressed: false},
    w: { pressed : false},
    Space: {pressed: false},
    ArrowRight: { pressed : false},
    ArrowLeft: { pressed : false},
    ArrowUp: { pressed : false},

};
// other sprites
const background = new Sprite({
    position: {x: 0, y:0},
    imageSrc: "./assets/background.png"
})

const shop = new Sprite({
    position: {
        x: 660,
        y: 128
    },
    imageSrc: "./assets/shop_animated.png",
    scale: 2.75,
    frames: 6
});


//
// intial player spawns
const player1 = new Player(
    { position: {x:100 , y:0}, velocity:{x:0 , y:0},
    imageOffSet: { x: 215,y: 157},
    imageSrc: './assets/player1/Idle.png',
    frames: 8,
    scale: 2.5
    , color: 'blue' // tempsd
    ,sprites: {
        idle: {
            imageSrc: './assets/player1/Idle.png',
            frames: 8,

        },
        run_left: {
            imageSrc: './assets/player1/Run-left.png',
            frames: 8
        },
        run_right: {
            imageSrc: './assets/player1/Run.png',
            frames: 8
        },
        jump: {
            imageSrc: './assets/player1/Jump.png',
            frames: 2
        },
        fall: {
            imageSrc: './assets/player1/Fall.png',
            frames: 2
        },
        attack1: {
            imageSrc: './assets/player1/Attack1.png',
            frames: 6
        },
        attack1_left: {
            imageSrc: './assets/player1/Attack1_left.png',
            frames: 6
        },
        hit: {
            imageSrc: './assets/player1/Take Hit.png',
            frames: 4
        },
        death: {
            imageSrc: './assets/player1/Death.png',
            frames: 6
        }
      
    }

  }
);

const player2 = new Player(
    { position: {x:900 , y:0}, velocity:{x:0 , y:0},
      imageOffSet: { x: 215,y: 171},
      imageSrc: './assets/player2/Idle.png',
      frames: 4,
      scale: 2.5
      , color: 'green' // temp
      ,sprites: {
        idle: {
            imageSrc: './assets/player2/Idle.png',
            frames: 4,

        },
        run_left: {
            imageSrc: './assets/player2/Run-left.png',
            frames: 8
        },
        run_right: {
            imageSrc: './assets/player2/Run.png',
            frames: 8
        },
        jump: {
            imageSrc: './assets/player2/Jump.png',
            frames: 2
        },
        fall: {
            imageSrc: './assets/player2/Fall.png',
            frames: 2
        },
        attack1: {
            imageSrc: './assets/player2/Attack1.png',
            frames: 4
        },
        attack1_left: {
            imageSrc: './assets/player2/Attack1_left.png',
            frames: 4
        },
        hit: {
            imageSrc: './assets/player2/Take hit.png',
            frames: 3
        },
        death: {
            imageSrc: './assets/player2/Death.png',
            frames: 7
        }
      
    }
    }
);
// End Game Setup

// Gamer Helper Functions
// Match Timer 
let timer = 30;
function decreaseTimer(){
    if (timer > 0){
        setTimeout(decreaseTimer, 1000);
        timer--;
        document.getElementById("timer").innerText = timer;
    }

}

function attackBoxCollision( Player1_attack, Player2_attack){
    var attacked = false;
    if(
        Player1_attack.attackBox.position.x + Player1_attack.attackBox.width >= Player2_attack.position.x 
        && Player1_attack.attackBox.position.x <= Player2_attack.position.x + Player2_attack.width
        && Player1_attack.attackBox.position.y + Player1_attack.attackBox.height >= Player2_attack.position.y 
        && Player1_attack.attackBox.position.y <= Player2_attack.position.y + Player2_attack.height
        ) {
            attacked = true;
        }
        
        return attacked;
}

function player1Movement(){
        // player 1 movement
        if(action_keys.a.pressed && player1.last_key === 'a'){
            // keep from going off screen
            if(player1.position.x > 0)
                player1.velocity.x =-horizontal_vel;
            // console.log(player1.position.x + "and" + player1.position.y);
            player1.switchSprites('run_left');
            
    
        } else if (action_keys.d.pressed &&  player1.last_key === 'd'){
            if(player1.position.x < 950)
                player1.velocity.x = horizontal_vel;
            player1.switchSprites('run_right');
        } else {
            player1.switchSprites('idle');
        }
    
        // player 1 jumping
        if(player1.velocity.y < 0){
            player1.switchSprites('jump');
        } else if (player1.velocity.y > 0){
            player1.switchSprites('fall');
        }
}

function player2Movement(){
        // player 2 movement
        if(action_keys.ArrowLeft.pressed && player2.last_key == 'ArrowLeft'){
            if(player2.position.x  > 0)
                player2.velocity.x =-horizontal_vel;
           player2.switchSprites('run_left');
        }
        else if(action_keys.ArrowRight.pressed && player2.last_key == 'ArrowRight'){
            if(player2.position.x < 950)
                player2.velocity.x =horizontal_vel;
            player2.switchSprites('run_right');
        }else {
            player2.switchSprites('idle');
        }
    
        // player 2 jumping
        if(player2.velocity.y < 0){
            player2.switchSprites('jump');
        } else if (player2.velocity.y > 0){
            player2.switchSprites('fall');
        }
}

function playerAttacksAndHealth(){
    // attack logging and health bar 
    if(player1.isAttacking && attackBoxCollision(player1, player2) && player1.currFrame>=3){
        
        console.log("player 1 attack landed");
        if(player2_healthbar >= 10){
            player2_healthbar -= 10;
            player2_hitbar = 100 - player2_healthbar;
        }
        player2.switchSprites('hit');

        

        document.getElementById("player2-bar").style.width = player2_healthbar + '%';
        document.getElementById("player2-hit").style.width = player2_hitbar + '%';
        document.getElementById("player2-points").innerHTML = player2_healthbar * 10;
        
        player1.isAttacking = false;
         

    } else if (player2.isAttacking && attackBoxCollision(player2, player1)  && player2.currFrame>=2){
        console.log("player 2 attack landed");
        if(player1_healthbar >= 5){
            player1_healthbar -= 5;
            player1_hitbar = 100 - player1_healthbar;
        }

        player1.switchSprites('hit');

        document.getElementById("player1-bar").style.width = player1_healthbar + '%';
        document.getElementById("player1-hit").style.width = player1_hitbar + '%';
        document.getElementById("player1-points").innerHTML = player1_healthbar * 10;

        player2.isAttacking = false;
    } else if ( player1.isAttacking && !attackBoxCollision(player1, player2) && player1.currFrame>=3){
        player1.isAttacking = false;
    } else if (player2.isAttacking && !attackBoxCollision(player2, player1) && player2.currFrame>=2){
        player2.isAttacking = false;
    }
}

function gameOver(){
    // game over clauses
    if(player1_healthbar <= 0 && player2_healthbar <= 0){
        player1.switchSprites('death');
        player2.switchSprites('death');
        
        document.getElementById("match-info").innerHTML = '!!!!! T I E !!!!';
    } else if (player1_healthbar <= 0){
        player1.switchSprites('death');

        document.getElementById("match-info").innerHTML = '!!!! PLAYER 2 WINS !!!!';
    } else if (player2_healthbar <= 0){
        player2.switchSprites('death');
        document.getElementById("match-info").innerHTML = '!!!! PLAYER 1 WINS !!!!';
    }
    if (timer === 0 && !player1.isDead && !player2.isDead){
        document.getElementById("match-info").innerHTML = 'TIME RAN OUT';
    }
}

// slider functionality used for testing health bars
// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value;

// slider.oninput = function() {
//   output.innerHTML = this.value;
//   document.getElementById("player1-bar").style.width = slider.value + '%';
//   document.getElementById("player1-hit").style.width = (100 - slider.value) + '%';

// //   document.getElementById("player2-bar").style.width = slider.value + '%';
// //   document.getElementById("player2-hit").style.width = (100-slider.value) + '%';
// }
