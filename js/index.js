
window.addEventListener('keydown', (event) => {
    if(!player1.isDead){
        switch(event.key){
            case 'd':
            action_keys.d.pressed = true;
            player1.last_key ='d';
            break;
            case 'a':
                action_keys.a.pressed = true;
                player1.last_key = 'a';
            break;
            case 'w': 
                player1.velocity.y = -vertical_vel; // negative to go up
            break;
            case ' ':
                event.preventDefault();
                player1.attack();
            break;
        }
    }
    
    if(!player2.isDead){
        switch(event.key){
            case 'ArrowRight':
                action_keys.ArrowRight.pressed = true;
                player2.last_key = 'ArrowRight';
            break;
            case 'ArrowLeft':
                action_keys.ArrowLeft.pressed = true;
                player2.last_key = 'ArrowLeft';
            break;
            case 'ArrowUp':
                player2.velocity.y = -vertical_vel;
            break;
            case 'ArrowDown':
                player2.attack();
            break;

            
        }
    }
    console.log(event.key);
});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            action_keys.d.pressed = false;
        break;
        case 'a':
            action_keys.a.pressed = false;
        break;

        //
        case 'ArrowRight':
            action_keys.ArrowRight.pressed = false;
        break;
        case 'ArrowLeft':
            action_keys.ArrowLeft.pressed = false;
        break;

    }
});
// End Event Listeners

// Recursive Animation Function

function animate(){
    c.fillStyle= 'black'
    window.requestAnimationFrame(animate);
    c.fillRect(0,0, canvas.width, canvas.height);
    background.update();
    shop.update();


    player1.update();
    player2.update();

    player1.velocity.x = 0;
    player2.velocity.x = 0;



    player1Movement();
    player2Movement();

    playerAttacksAndHealth();

    gameOver();

}

// game procedure
animate();
decreaseTimer();
// functions







