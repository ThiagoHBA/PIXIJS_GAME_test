export default class KeyboardController{
    constructor(player){
        this._player = player;
        this.left = keyboard(37);
        this.up = keyboard(38);
        this.right = keyboard(39);
        this.down = keyboard(40);

        left.press = function(__player) {
            __player.vx = -5;
            __player.vy = 0;
        }; 

        left.release = function(__player) {
            if (!right.isDown && __player.vy === 0) {
                __player.vx = 0;
            }
        };

        up.press = function(__player) {
            _player.vy = -5;
            _player.vx = 0;
        };
        up.release = function(__player) {
            if (!down.isDown && _player.vx === 0) {
            _player.vy = 0;
            }
        };
        
        right.press = function(__player) {
            _player.vx = 5;
            _player.vy = 0;
        };
        right.release = function(__player) {
            if (!left.isDown && _player.vy === 0) {
            _player.vx = 0;
            }
        };
        
        down.press = function(__player) {
            _player.vy = 5;
            _player.vx = 0;
        };

        down.release = function(__player) {
            if (!up.isDown && _player.vx === 0) {
            _player.vy = 0;
            }
        };
    }

    play(delta, _player) {
        _player.x += _player.vx;
        _player.y += _player.vy
    }
}

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    
    key.downHandler = function(event) {
        if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        }
        event.preventDefault();
    };
    
    key.upHandler = function(event) {
        if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        }
        event.preventDefault();
    };
    
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}