class level1 extends Phaser.Scene {
    /**@type {number}*/
    livesLeft = 3
    /** @type {number} */
    scoreCount = 0

    constructor() {
        super('level1')
    }

    preload() {
        this.load.image('emoji', 'assets/emoji.png')
        this.load.image('ball', 'assets/ball.png')
        this.load.image('paddle', 'assets/paddle.png')
        this.load.image('block', 'assets/block.png')
    }

    create() {
        const { width, height } = this.scale

        //-- Create the Ball --//
        const ball = this.matter.add.image(400, 300, 'ball', undefined, {
            restitution: 1,
            friction: 0,
            density: 1,
            //@ts-ignore
            shape: 'circle'
        })
        ball.setVelocity(3, 3)
        const body = ball.body
        this.matter.body.setInertia(body, Infinity)
        ball.setFrictionAir(0)
        ball.setBounce(1)

        //-- Lives counter --//
        this.lives = this.add.text(50, 20, 'Lives = ' + this.livesLeft)

        //-- Score counter --//
        this.score = this.add.text(50, 40, 'Score = ' + this.scoreCount)

        //-- Create the Paddle --//
        this.paddle = new paddle(this)

        //-- Detect Collsion between bottom world border and ball ---//

        //-- Create Blocks and make them destructable --//

        //-- Add Score for every block broken --//
    }

    update() {
        this.paddle.update()
    }

    livesLeftReduction(){
        this.livesLeft -= 1
    }
}