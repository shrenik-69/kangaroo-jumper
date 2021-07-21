/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var shrubsGroup,obstaclesGroup

var invground;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();

  invground = createSprite(0,400,1600,5);
  invground.visible = false;

  kangaroo = createSprite(130,300,50,50);
  kangaroo.addAnimation("running",kangaroo_running);
  kangaroo.addAnimation("collided",kangaroo_collided);
  kangaroo.setCollider("circle",0,0,300);
  kangaroo.debug = true;
  kangaroo.scale = 0.15
  

}

function draw() {
  background(255);


  if (gameState === PLAY) {

    kangaroo.collide(invground);

     jungle.velocityX = 2

     if(jungle.x > 700) {
       jungle.x = 400;
     }

     if(keyDown("space") && kangaroo.y > 190) {
       kangaroo.velocityY = -14
     }

     if(shrubsGroup.isTouching(kangaroo)) {
       score =+1;
       shrubsGroup.destroyEach;
     }

     if (obstaclesGroup.isTouching(kangaroo)) {
       gameState = END
     }

     kangaroo.velocityY = kangaroo.velocityY +0.6

     

  }
  
  kangaroo.x = camera.position.x -270;

  text("Score: "+ score, 100,10);
     fill("white");


  spawnShrubs();
  spawnobstacles();

  


  drawSprites();

}

function spawnShrubs() {
  if (frameCount % 150 === 0) {
    var shrub = createSprite(camera.position.x +500,330,40,10);
    shrub.addImage(shrub1);
    shrub.scale = 0.1;
    shrub.velocityX = -3;
    
    shrub.lifetime = 800;
    
    shrubsGroup.add(shrub);
  }
}

function spawnobstacles() {
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(camera.position.x +500,330,40,10);
    obstacle.addImage(obstacle1);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    
    obstacle.lifetime = 800;
    
    obstaclesGroup.add(obstacle);
  }
}
