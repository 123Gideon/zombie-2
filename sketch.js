var bg, bgImg;
var player, shooterImg, shooter_shooting;
var bullet, bulletImg;
var zombie, zombieImg;
var zombieGroups;
var bulletGroups;
var life = 3;
var life1, life2, life3, life1Img, life2Img, life3Img;
var gamestate="play"


function preload() {
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bulletImg = loadImage("assets/bullet.png");
  zombieImg = loadImage("assets/zombie.png");
  life1Img=loadImage("assets/heart_1.png")
life2Img=loadImage("assets/heart_1.png")
life3Img=loadImage("assets/heart_1.png")

  bgImg = loadImage("assets/bg.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.1;

  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;

  player.debug = true;

  player.setCollider("rectangle", 0, 0, 300, 300);

  zombieGroups = new Group();
  bulletGroups = new Group();
  life1=createSprite(displayWidth/2+100,100)
  life1.addImage(life1Img)
  life1.scale=0.7

  life2=createSprite(displayWidth/2+250,100)
  life2.addImage(life2Img)
  life2.scale=0.7

 life3=createSprite(displayWidth/2+400,100)
  life3.addImage(life3Img)
  life3.scale=0.7

}

function draw() {
  background(0);

  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30;
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30;
  }
  if (player.y > 660) {
    player.y = 660;
  }

  if (player.y < 70) {
    player.y = 70;
  }

  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {
    player.addImage(shooter_shooting);
    bullet = createSprite(player.x, player.y);
    bullet.addImage(bulletImg);
    bullet.velocityX = 12;
    bullet.scale = 0.1;
    bulletGroups.add(bullet);
  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyDown("space")) {
    player.addImage(shooterImg);
  }

  drawSprites();
  createzombies();
  for(var i=0;i<zombieGroups.length;i +=1){
    if(zombieGroups.get(i).isTouching(player)){
      zombieGroups.get(i).destroy()
      life-=1
    }
  }
  if(life===2){
    life3.destroy()
  }

  if(life===1){
    life2.destroy()
  }

  if(life===0){
    life1.destroy()
  }
  for (var i = 0; i < zombieGroups.length; i += 1) {
    for (var j = 0; j < bulletGroups.length; j += 1) {
      if (zombieGroups.get(i).isTouching(bulletGroups.get(j))) {
        zombieGroups.get(i).destroy();
        bulletGroups.get(j).destroy();
      }
    }
  }
}
function createzombies() {
  if (frameCount % 30 === 0) {
    zombie = createSprite(width - 20, 200, 300, 40);
    zombie.addImage("dead", zombieImg);
    zombie.scale = 0.1;
    zombie.velocityX = -11;
    zombie.y = Math.round(random(150, 600));
    zombie.lifetime = 160;
    zombieGroups.add(zombie);
  }
}
