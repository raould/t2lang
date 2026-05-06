import * as Phaser from "phaser";
const gWidth = 480;
const gHeight = 640;
class Player extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.time.addEvent({
      delay: 100,
      callback: () => {
        this.randomColorize();
      },
      loop: true
    });
  }
  randomColorize() {
    this.setTint((Math.random() * 16777215));
  }
}
class Scene1 extends Phaser.Scene {
  private gem: Phaser.GameObjects.Sprite;
  constructor() {
    super("Scene1");
  }
  preload() {
    console.log("preload");
    this.load.image("g1", "images/g1.png");
  }
  create() {
    console.log("create");
    this.gem = this.add.sprite(gWidth / 2, gHeight / 2, "g1");
    this.gem.scaleX = 2;
    this.gem.scaleY = 2;
  }
}
const config = {
  type: Phaser.AUTO,
  width: gWidth,
  height: gHeight,
  scene: new Scene1(),
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: gWidth,
      height: gHeight
    }
  }
};
const game = new Phaser.Game(config);
