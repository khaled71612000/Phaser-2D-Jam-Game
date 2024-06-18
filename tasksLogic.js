
import { CST } from "./CST.js"

export class Task extends Phaser.Scene{

  constructor(pos , taskno) {
    super({
        key : CST.SCENES.LEVEL1
    })
    this.isSolved = false;
    this.taskno = taskno;
 

    if (!pos) {
      this.taskBody = document.getElementById("task1");
    } else {
      this.taskBody = document.getElementById("task2");
    }
  }

  generateTask1(btnpos,platermoveR,platermoveL) {

    var rand1,rand2;
    rand1 = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    rand2 = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    this.taskBody.innerHTML =`<p id="timer">Timer : 0 </p><p class= "nums">${rand1} + ${rand2} </p><div class="inGR"><input autofocus id="task1Input" placeholder="Enter Sum"><button id="btn${btnpos}" type="button" class="btn ">Enter</button></div>`
    var answer ;

    if(this.taskno == 'task1') {
        this.taskBody.classList.add(`bg${1}`);
    } else if(this.taskno == 'task2') {
        this.taskBody.classList.add(`bg${2}`);
    }
    this.taskBody.style.visibility = "visible";
    var timeDiv = document.querySelector("#timer");
    startTimer(60, timeDiv);
    setTimeout(() => {
      if (this.isSolved == false) {
        this.endTask(platermoveR,platermoveL);
      }
    }, 1000 * 60);
    document.getElementById(`btn${btnpos}`).addEventListener("click", () => {
    answer = document.querySelector('#task1Input').value ; 
      
      this.isSolved = true;
      this.endTask(platermoveR,platermoveL);
      if( parseInt(answer)  == rand1+rand2 ){
        if (btnpos == 1) {
          this.answerR = true;
          platermoveR = 1;
        } else if (btnpos == 0) {
          this.answerL = true;
          platermoveL = 1;
        }
      }
      if (btnpos == 1) {
        platermoveR = 1;
      } else if (btnpos == 0) {
        platermoveL = 1;
      }


    });
  }
  generateTask2(btnpos,platermoveR,platermoveL) {

    var spamCount = 0;
    this.taskBody.innerHTML = `<p id="timer2">Timer : 0 </p>`;
    if(this.taskno == 'task1') {

      this.taskBody.classList.add(`bg${1}`);
  } else if(this.taskno == 'task2') {
      this.taskBody.classList.add(`bg${2}`);
  }

    this.taskBody.style.visibility = "visible";
    var timeDiv = document.querySelector("#timer2");
    startTimer(60, timeDiv);
   setTimeout(() => {
      if (this.isSolved == false) {
        this.endTask(platermoveR,platermoveL);
      }
    }, 1000 * 60);

    document.addEventListener('keyup' , (e)=>{
      
      if(e.key == "w" || e.key == "ArrowUp"){
          if(spamCount < 30){
              spamCount+=1;
          }else{
              spamCount = 0; 
              if (btnpos == 1) {
                answerR = true;
               platermoveR = 1;
                  } else if (btnpos == 0) {
                    this.answerL = true;
                    platermoveL = 1;
                  }
              this.endTask(platermoveR,platermoveL);
          }
      }
    })

}
  
  endTask(platermoveR,platermoveL) {
    this.taskBody.style.visibility = "hidden";
    if(this.pos == 0) {
      this.taskBody.classList.remove(`bg${1}`);
    } else {
      this.taskBody.classList.remove(`bg${2}`);
    }
    var objret = {
      p1 : platermoveR,
      p2: platermoveL
    }
    return objret;
  }
}

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000 * 60);
}
