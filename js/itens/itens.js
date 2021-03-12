import KeyboardController from "../keyboard_controller/keyboard_controller.js";

let app = new PIXI.Application({ 
    width: window.screen.width, 
    height: window.screen.height,
    antialiasing: true, 
    transparent: false, 
    backgroundColor: 0xAAAAAA,
    resolution: 1,
  }
);

document.body.appendChild(app.view);

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const sprite = PIXI.Sprite.from('images/start-btn.png');
const texture = PIXI.Texture.from('images/player.png');

texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

let state;
let player = new PIXI.Sprite(texture);

player.y = 580; 
player.vx = 0;
player.vy = 0;

KeyboardController(player);

app.stage.addChild(player);
state = play;

app.ticker.add(delta => gameLoop(delta));

function gameLoop(delta){
    state(delta);
}

sprite.anchor.set(0.5);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
sprite.scale.x *= 0.1;
sprite.scale.y *= 0.1;

sprite.interactive = true;
sprite.buttonMode = true;

sprite.on('pointerdown', onClick);

app.stage.addChild(sprite);

const rocks = [
'images/rock1.png',
'images/rock2.png',
'images/rock3.png',
'images/rock4.png',
'images/rock5.png'
];

function createObstacle(){
  let rock = Math.ceil(Math.random() * rocks.length + 1);
  let _player = new PIXI.Sprite.from(rocks[rock]);

  _player.scale.x *= Math.random() * (0.3 - 0.1) + 0.1;
  _player.scale.y *= Math.random() * (0.5 - 0.1) + 0.1;

  _player.x = Math.random() * (window.screen.width); 
  app.stage.addChild(_player);
  app.ticker.add(param => gameLoop(param, _player));
}

function gameLoop(param, value){
  value.y += 5;
}

function onClick() {
  //app.stage.removeChild(sprite);
  setInterval(createObstacle, 500);
} 