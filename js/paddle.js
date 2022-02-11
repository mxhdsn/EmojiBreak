class paddle {
    /** @type {boolean} */
    isFrozen

    constructor(scene) {
        this.scene = scene
        this.touchData = {}
        this.paddle = scene.matter.add
            .image(400, 550, 'paddle')
            .setBody({
                type: 'rectangle',
            })
            .setScale(1)
            .setFixedRotation()
            .setFrictionAir(0.001)

        this.scene.input.on('pointerdown', this.handlePointerDown, this)
        this.scene.input.on('pointerup', this.handlePointerUp, this)
    }

    handlePointerDown(pointer) {
        this.touchData.startX = pointer.x
        this.touchData.startY = pointer.y
    }

    handlePointerUp(pointer) {
        this.scene.scale.startFullscreen()
        this.touchData.endX = pointer.x
        this.touchData.endY = pointer.y
        this.handleTouch()
    }

    handleTouch() {
        const dx = this.touchData.endX - this.touchData.startX
        const dy = this.touchData.endY - this.touchData.startY
        this.touchData.startX = this.touchData.startY = this.touchData.endX = this.touchData.endY = 0
        const tolerance = 5
        if (dx > tolerance) {
            this.moveRight = true
        } else if (dx < -tolerance) {
            this.moveLeft = true
        }
    }

    update() {
        if (this.isFrozen) {
            return
        }
        const xForce = 0.01
        if (this.moveRight) {
            this.paddle.applyForce({
                x: xForce,
                y: 0,
            })
        } else if (this.moveLeft){
            this.paddle.applyForce({
                x: -xForce,
                y: 0
            })
        }
        this.moveLeft = this.moveRight = false
    }
}