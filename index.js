import { LoadScene } from "./loadScene.js";
import { MenuScene } from "./menuScene.js";
import { LevelOne } from "./level1.js";


var config = {
  type: Phaser.AUTO,
  width: 1530,
  height: 710,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1500 },
      debug: false,
    },
  },
  scene: [LoadScene,MenuScene,LevelOne]
};


var game = new Phaser.Game(config);






