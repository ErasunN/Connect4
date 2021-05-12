class Ficha {
    constructor(posX, posY, radius, color, ctx, team) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
        this.team = team;
        this.isBloqued = false;
        this.draw();
    }

    getPosX() {
        return this.posX
    }

    getPosY() {
        return this.posY;
    }

    draw() {
        this.ctx.drawImage(this.color, this.posX - this.radius, this.posY - this.radius, 2 * this.radius, 2 * this.radius);
    }

    hit(posX, posY) {
        let radio = Math.sqrt((posX - this.posX) ** 2 + (posY - this.posY) ** 2);
        return radio < this.radius;
    }

    move(posX, posY) {
        if (!this.isBloqued) {
            this.posX = posX;
            this.posY = posY;
        }

    }
}