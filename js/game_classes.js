// uses global canvas context of c in game_setup.js
class Sprite{
    constructor({position, imageSrc, scale = 1, frames = 1, imageOffSet = { x: 0, y: 0}}){
        this.position = position; // x and y properties
        // gen ratios


        //image setup
        this.image = new Image();
        this.image.src = imageSrc; // string aka file path
        this.scale = scale;

        // animation frames
        this.frames = frames;
        this.currFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.imageOffSet = imageOffSet;

    }
    
    draw(){ 
        c.drawImage(this.image, 
           this.currFrame * (this.image.width / this.frames), 0, this.image.width / this.frames, this.image.height,

            this.position.x - this.imageOffSet.x , this.position.y - this.imageOffSet.y, 
            (this.image.width / this.frames) * this.scale , this.image.height * this.scale);

        // c.image.style.border = '10px solid blue';
    }
    

    update(){
        this.draw();
        this.framesElapsed++;
            if(this.framesElapsed % this.framesHold === 0){
                if(this.currFrame < this.frames - 1){
                    this.currFrame++;
                } else {
                    this.currFrame = 0;
                }
            }
        // frame handler for croping and moving image up to next frame
        
    }
}

class Player extends Sprite {
    constructor({position, velocity , imageSrc, scale = 1, frames = 1, imageOffSet = { x: 0, y: 0}, color , sprites}){
        super({position, imageSrc, scale, frames, imageOffSet });
        // rectangle collison vars
        this.width = 50;
        this.height = 150;

        //
        this.velocity = velocity;
        this.last_key; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

        this.currFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;

        // attack box
        this.color = color;
        this.attackBox = {
            position: {x: this.position.x , y: this.position.y},
            width: 150,
            height: 50,
        }
        this.isAttacking = false;
        this.isFacingLeft = false;

        this.isDead = false;

        this.sprites = sprites;

        for (const sprite in this.sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src =  sprites[sprite].imageSrc;
        }
       

    }


    update(){
        
        // attack box
        this.attackBox.position.x = this.position.x + 100 ;
        this.attackBox.position.y =  this.position.y + (50); // additon  moves down

            if(this.last_key === 'a'  || this.last_key === 'ArrowLeft'  ){
                this.attackBox.position.x =  this.position.x - this.attackBox.width + this.width - 100; // subtraction moves left
                console.log("FLIPPING");
                this.isFacingLeft = true;
            } 

            // c.fillStyle = this.color;
            // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
            
        super.draw()
        if(!this.isDead) 
            super.update();



        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // gravity function
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 90){
            this.velocity.y =0;
            this.position.y = 336;
        }   else {
            this.velocity.y += gravity;
        }

    }   

    attack(){

        if(this.last_key === 'a'  || this.last_key === 'ArrowLeft'  ){
            this.isFacingLeft = true;
        } else { this.isFacingLeft = false; }

        if (this.isFacingLeft){
            this.switchSprites('attack1_left');
        } else this.switchSprites('attack1');
        this.isAttacking = true;
        // setTimeout(() => {this.isAttacking = false;}, 100 )

    }
    
    switchSprites(sprite){

    if(this.image === this.sprites.death.image ){

        if (this.currFrame === this.sprites.death.frames -1)
            this.isDead = true;
        
            return;
    } 

    if( this.image === this.sprites.hit.image &&
         this.currFrame < this.sprites.hit.frames - 1) return;

    if (
    (this.image === this.sprites.attack1.image &&
        this.currFrame < this.sprites.attack1.frames - 1) ) return;

    if (this.image === this.sprites.attack1_left.image &&
        this.currFrame < this.sprites.attack1_left.frames - 1 ) return;

    
        switch (sprite) {
            case 'idle':
              if (this.image !== this.sprites.idle.image) {
                this.image = this.sprites.idle.image
                this.frames = this.sprites.idle.frames
                this.currFrame = 0
              }
            break
            case 'run_left':
              if (this.image !== this.sprites.run_left.image) {
                this.image = this.sprites.run_left.image
                this.frames = this.sprites.run_left.frames
                this.currFrame = 0
              }
            break
            case 'run_right':
                if (this.image !== this.sprites.run_right.image) {
                  this.image = this.sprites.run_right.image
                  this.frames = this.sprites.run_right.frames
                  this.currFrame = 0
                } 
            break
            case 'jump':
              if (this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image
                this.frames = this.sprites.jump.frames
                this.currFrame = 0
              } 
            break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.frames = this.sprites.fall.frames
                    this.currFrame = 0
                  } 
            break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.frames = this.sprites.attack1.frames
                    this.currFrame = 0
                  } 
            break
            case 'attack1_left':
                if (this.image !== this.sprites.attack1_left.image) {
                    this.image = this.sprites.attack1_left.image
                    this.frames = this.sprites.attack1_left.frames
                    this.currFrame = 0
                  } 
            break
            case 'hit':
                if (this.image !== this.sprites.hit.image) {
                    this.image = this.sprites.hit.image
                    this.frames = this.sprites.hit.frames
                    this.currFrame = 0
                  } 
            break
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.frames = this.sprites.death.frames
                    this.currFrame = 0
                  } 
            break
        }
      
    }

}

