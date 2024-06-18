import { CST } from "./CST.js"
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key : CST.SCENES.LOAD
        })
    }

preload() {
    this.load.image("intro", "assets/intro.png");

}
    create(){
        this.add.image(765, 355, "intro");

        document.getElementById("startGameBtn").addEventListener('click' , ()=>{
            this.scene.start(CST.SCENES.MENU , 'hello from load');
            document.getElementById('startGameBtn').style.display = "none";
        })
    }
}