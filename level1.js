import { CST } from "./CST.js"
import { Task } from "./tasksLogic.js"

var windowWidth = 1530;
var windowHeight = 710;


var playerXSpeed = 350;
var jump = 850;

var platermoveL = 1;
var platermoveR = 1;
var answerL = false;
var answerR = false;

var taskBody = document.getElementById("task1").style.visibility;
var scoreL = 0;
var scoreR = 0;
var input, line, player1, player2, platforms;
var keyA, keyW, keyD;
var leftplat1, rightplat1;
var leftplat = [];
var rightplat = [];
var tweenleft = [];
var tweenright = [];
var y;
var tileSprite1, tileSprite2;
var img;
var task;
var tasksgood = [];
var tasksevil = [];

var objDisplay = {
  win: "./assets/you_win.png",
  lose: "./assets/game_over.png",
};

var gameover = false;
var p1died = false;
var p2died = false;

var running = true;

var n = 25;
var randerplatx = [];
var randerplaty = [];
let minc = 210;

randerplaty[0] = 400;
randerplaty[1] = 200;

for (let i = 0; i < n; i++) {
  randerplatx[i] = Phaser.Math.Between(110, 450);
  randerplaty[i + 1] = Phaser.Math.Between(340, 370) - minc;
  minc += 200;
}
var platformPositionY = randerplaty;
var platformPositionX = randerplatx;

var platformPositionX2 = platformPositionX;
var addplatpos = 800;

var platformsgood = [];
var platformsbad = [];

var y = -300;

var start = true;
 var floor1;
 var floor2;

 var taskgood;
 var taskevil;
 var keyS;
 var text1;
 var text2;
 var text3;
 var text4;
 var text5;

export class LevelOne extends Phaser.Scene{
    constructor(){
        super({
            key : CST.SCENES.LEVEL1
        })
    }


    preload() {
        this.load.spritesheet("spritesheet", "assets/green1.png", {
          frameWidth: 1344 / 7,
          frameHeight: 1032 / 3,
        });
        this.load.spritesheet("red", "assets/image1.png", {
          frameWidth: 1414 / 7,
          frameHeight: 1107 / 3,
        });
        this.load.spritesheet("jump", "assets/redJump.png", {
          frameWidth: 1152 / 6,
          frameHeight: 2082 / 6,
        });
        this.load.spritesheet("jump1", "assets/greenJump1.png", {
          frameWidth: 1098 / 6,
          frameHeight: 1938 / 6,
        });
        this.load.spritesheet("idlegreen", "assets/greeni.png", {
          frameWidth: 1800 / 9,
          frameHeight: 1625 / 5,
        });
        this.load.spritesheet("idlered", "assets/redi.png", {
          frameWidth: 1737 / 9,
          frameHeight: 1665 / 5,
        });
      
        this.load.audio("theme", ["assets/music.mp3"]);
      
        this.load.image("leftBG", "assets/L_L1_00.png");
        this.load.image("rightBG", "assets/R_L1_00.png");
      
        this.load.image("stars", "assets/STARS.png");
      
        this.load.image("rightBG-1", "assets/R_L1_01.png");
        this.load.image("leftBG-1", "assets/L_L1_01.png");
      
        this.load.image("line", "assets/line.png");
        this.load.image("floor", "assets/line2.png");
      
        this.load.image("task1", "assets/monster.png");
        this.load.image("task2", "assets/planet.png");
      
        this.load.image("task", "assets/monster.png");
      
        this.load.image("platformGood", "assets/platform good.png");
        this.load.image("platformevil", "assets/platform evil.png");
      
        this.load.spritesheet("gulb", "assets/gulb.png", {
          frameWidth: 192,
          frameHeight: 344,
        });
        this.load.spritesheet("gulp", "assets/gulp.png", {
          frameWidth: 202,
          frameHeight: 396,
        });
      }
      

    create() {
    this.add.image(382, 356, "leftBG");
    this.add.image(1147, 356, "rightBG");

    tileSprite1 = this.add.tileSprite(0, 0, 1530, 1420, "stars");
    tileSprite2 = this.add.tileSprite(1145, 0, 764, 1420, "stars");

    this.add.image(382, 356, "leftBG-1");
    this.add.image(1147, 356, "rightBG-1");

    floor1 = this.physics.add.staticGroup();
    floor1.create(382, 710, "floor").setScale(0.5, 1).refreshBody();
    floor2 = this.physics.add.staticGroup();
    floor2.create(1148, 710, "floor").setScale(0.5, 1).refreshBody();

    this.add.image(764, 350, "line");
    line = this.physics.add.staticGroup();
    line.create(764, 584, "line").setScale(1, 2).refreshBody();

    player1 = this.physics.add.sprite(380, 500, "spritesheet").setScale(0.23);
    player1.setCollideWorldBounds(false);
    player1.setBounce(0.1);
    player2 = this.physics.add.sprite(1145, 500, "red").setScale(0.21);
    player2.setCollideWorldBounds(false);
    player2.setBounce(0.1);

    taskgood = this.physics.add.group({
        allowGravity: false,
    });
    taskevil = this.physics.add.group({
        allowGravity: false,
    });

    var taskType = ["task1", "task2"];
    var randType;
    for (let i = 0; i < n; i++) {
        randType = Phaser.Math.Between(0, 1);
        if (i % 2 == 0) {
        tasksgood[i] = taskgood
            .create(
            platformPositionX[i] - 50,
            platformPositionY[i] - 50,
            taskType[randType]
            )
            .setScale(0.35);
        }
    }

    for (let i = 0; i < n; i++) {
        randType = Phaser.Math.Between(0, 1);
        if (i % 2 == 0) {
        tasksevil[i] = taskevil
            .create(
            platformPositionX[i] - 50 + addplatpos,
            platformPositionY[i] - 50,
            taskType[randType]
            )
            .setScale(0.35);
        }
    }

    platformsgood = this.physics.add.group({
        allowGravity: false,
        immovable: true,
    });
    for (let i = 0; i < n; i++) {
        platformsgood
        .create(platformPositionX[i], platformPositionY[i], "platformGood")
        .setScale(0.5, 0.5)
        .refreshBody();
    }

    platformsbad = this.physics.add.group({
        allowGravity: false,
        immovable: true,
    });
    for (let i = 0; i < n; i++) {
        platformsbad
        .create(
            platformPositionX[i] + addplatpos,
            platformPositionY[i],
            "platformevil"
        )
        .setScale(0.5, 0.5)
        .refreshBody();
    }

    var dur = 0;
    y = 0;
    for (let i = 0; i < 10; i++) {
        if (i == 0) dur = 5500;
        else {
        dur = dur;
        }
        tweenleft[i] = this.tweens.add({
        targets: leftplat[i],
        y: 800,
        duration: dur,
        ease: "linear",
        paused: true,
        });
        dur += 4000;
    }
    dur = 0;
    for (let i = 0; i < 10; i++) {
        if (i == 0) dur = 5500;
        else {
        dur = dur;
        }
        tweenright[i] = this.tweens.add({
        targets: rightplat[i],
        y: 800,
        duration: dur,
        ease: "linear",
        paused: true,
        });
        dur += 4000;
    }

    this.physics.add.collider(player1, line);
    this.physics.add.collider(player2, line);
    for (let i = 0; i < n; i++) {
        this.physics.add.collider(player1, platformsgood);
        this.physics.add.collider(platformsgood, tasksgood);
    }
    for (let i = 0; i < n; i++) {
        this.physics.add.collider(player2, platformsbad);
        this.physics.add.collider(platformsbad, tasksevil);
    }
    this.physics.add.collider(player1, floor1, colo1, null, this);
    this.physics.add.collider(player2, floor2, colo2, null, this);

    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    input = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(player1, tasksgood, playerOne1TaskOverlap);
    this.physics.add.overlap(player2, tasksevil, playerOne2TaskOverlap);


    this.anims.create({
        key: "idlered",
        frames: this.anims.generateFrameNumbers("idlered", {
        framestart: 0,
        frameend: 44,
        }),
        frameRate: 30,
        repeat: -1,
    });
    this.anims.create({
        key: "idlegreen",
        frames: this.anims.generateFrameNumbers("idlegreen", {
        framestart: 0,
        frameend: 44,
        }),
        frameRate: 30,
        repeat: -1,
    });
    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("spritesheet", {
        framestart: 0,
        frameend: 21,
        }),
        frameRate: 30,
        repeat: -1,
    });

    this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers("jump", {
        framestart: 0,
        frameend: 35,
        }),
        frameRate: 30,
        repeat: -1,
    });
    this.anims.create({
        key: "jump1",
        frames: this.anims.generateFrameNumbers("jump1", {
        framestart: 0,
        frameend: 35,
        }),
        frameRate: 30,
        repeat: -1,
    });

    this.anims.create({
        key: "red",
        frames: this.anims.generateFrameNumbers("red", {
        framestart: 0,
        frameend: 21,
        }),
        frameRate: 30,
        repeat: -1,
    });

    var music = this.sound.add("theme");

    music.play();

    text1 = this.add.text(730, 0, "0", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    text2 = this.add.text(790, 0, "0", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    text3 = this.add.text(332, 50, "", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    text3.setFontSize(50);
    text4 = this.add.text(1100, 50, "", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    text4.setFontSize(50);

    text5 = this.add.text(765, 50, "", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    });
    text5.setFontSize(100);
    }
      
      
    update() {

    if (player1.y >= 700) {
        p1died = true;
    }

    if (player2.y >= 700) {
        p2died = true;
    }

    // if (p1died) {
    //   document.getElementById("pop22").src = objDisplay.lose;
    //   document.getElementById("pop11").src = objDisplay.win;
    // }
    // if (p2died) {
    //   document.getElementById("pop11").src = objDisplay.lose;
    //   document.getElementById("pop22").src = objDisplay.win;

    // }

    if (p2died || p1died) {
        text3.setText(`Score ${scoreL}`);
        text4.setText(`Score ${scoreR}`);
    }

    if (answerL) {
        scoreL += 20;
        answerL = false;
    }
    if (answerR) {
        scoreR += 20;
        answerR = false;
    }


    Phaser.Actions.IncY(taskgood.getChildren(), platermoveL);

    Phaser.Actions.IncY(platformsgood.getChildren(), platermoveL);

    Phaser.Actions.IncY(taskevil.getChildren(), platermoveR);

    Phaser.Actions.IncY(platformsbad.getChildren(), platermoveR);

    if (tileSprite1.y < windowHeight) {
        tileSprite1.y += 2;
    } else {
        tileSprite1.y = 0;
    }

    if (tileSprite2.y < windowHeight) {
        tileSprite2.y += 3;
    } else {
        tileSprite2.y = 0;
    }

    if (keyW.isDown && keyA.isDown) {
        player1.setVelocityX(-playerXSpeed);

        if (player1.body.touching.down) player1.setVelocityY(-jump);

        player1.anims.play("jump1", true);
        player1.flipX = true;
    } else if (keyW.isDown && keyD.isDown) {
        player1.setVelocityX(playerXSpeed);

        if (player1.body.touching.down) player1.setVelocityY(-jump);

        player1.anims.play("jump1", true);
        player1.flipX = false;
    } else if (keyA.isDown) {
        player1.setVelocityX(-playerXSpeed);
        player1.anims.play("right", true);
        player1.flipX = true;
    } else if (keyD.isDown) {
        player1.setVelocityX(playerXSpeed);
        player1.anims.play("right", true);
        player1.flipX = false;
    } else if (keyW.isDown && player1.body.touching.down) {
        player1.setVelocityY(-jump);
        player1.anims.play("jump1", true);
    } else if (keyW.isDown && player1.body.touching.down) {
        player1.setVelocityY(-jump);
    } else {
        player1.setVelocityX(0);
        player1.anims.play("idlegreen", true);
    }



    if (input.up.isDown && input.left.isDown) {
        player2.setVelocityX(-playerXSpeed);

        if (player2.body.touching.down) player2.setVelocityY(-jump);

        player2.anims.play("jump", true);
        player2.flipX = true;
    } else if (input.up.isDown && input.right.isDown) {
        player2.setVelocityX(playerXSpeed);

        if (player2.body.touching.down) player2.setVelocityY(-jump);

        player2.anims.play("jump", true);
        player2.flipX = false;
    } else if (input.left.isDown) {
        player2.setVelocityX(-playerXSpeed);
        player2.anims.play("red", true);
        player2.flipX = true;
    } else if (input.right.isDown) {
        player2.setVelocityX(playerXSpeed);
        player2.anims.play("red", true);
        player2.flipX = false;
    } else if (input.up.isDown && player2.body.touching.down) {
        player2.setVelocityY(-jump);
        player2.anims.play("jump", true);
    } else if (input.up.isDown && player2.body.touching.down) {
        player2.setVelocityY(-jump);
    } else {
        player2.setVelocityX(0);
        player2.anims.play("idlered", true);
    }


    text1.setText(scoreL.toString());

    text2.setText(scoreR.toString());
    }
  
}


function playerOne1TaskOverlap(player, task1) {
    let kk = 0;
    var t = new Task(kk, task1.texture.key,platermoveR,platermoveL);
    if (task1.texture.key == "task1") {
      t.generateTask1(kk,platermoveR,platermoveL);
    } else if (task1.texture.key == "task2") {
      t.generateTask2(kk,platermoveR,platermoveL);
    }
    task1.disableBody(true, true);
    platermoveL = 0;
    console.log(t.platermoveL);
  }
  
  
  
  function playerOne2TaskOverlap(player, task2) {
    let kk = 1;
    var t = new Task(kk, task2.texture.key,platermoveR,platermoveL);
    if (task2.texture.key == "task1") {
      t.generateTask1(kk,platermoveR,platermoveL);
    } else if (task2.texture.key == "task2") {
      t.generateTask2(kk,platermoveR,platermoveL);
    }
    task2.disableBody(true, true);
    platermoveR = 0;
    console.log(t.platermoveR);

  }
  
  
  
  function colo1(player, floor1) {
    setTimeout(() => {
      floor1.body.enable = false;
    }, 10000);
  }
  
  
  function colo2(player, floor2) {
    setTimeout(() => {
      floor2.body.enable = false;
    }, 10000);
  }

  
