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

    //Devuelve la posicion "x" de la ficha
    getPosX() {
        return this.posX
    }

    //Devuelve la posicion "y" de la ficha
    getPosY() {
        return this.posY;
    }

    //Dibuja la imagen de la ficha
    draw() {
        this.ctx.drawImage(this.color, this.posX - this.radius, this.posY - this.radius, 2 * this.radius, 2 * this.radius);
    }

    //Obtiene si la ficha fue clickeada
    hit(posX, posY) {
        let radio = Math.sqrt((posX - this.posX) ** 2 + (posY - this.posY) ** 2);
        return radio < this.radius;
    }

    //Cambia la ficha de posicion
    move(posX, posY) {
        if (!this.isBloqued) {
            this.posX = posX;
            this.posY = posY;
        }

    }
}