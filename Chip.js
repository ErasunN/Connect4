class Chip {
    constructor(posX, posY, color, radius, context, owner, image) {
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.radius = radius;
        this.context = context;
        this.owner = owner;
        this.setImage(image);
    }

    setImage(img) {
        this.img = img;
        this.draw();
    }

    getPosX() {
        return this.posX
    }

    getPosY() {
        return this.posY;
    }

    draw() {
        this.context.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);

        /* this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath(); */
    }

    isHitted(clickedX, clickedY) {
        return Math.sqrt((clickedX - this.posX) ** 2 + (clickedY - this.posY) ** 2) < this.radius;
    }

    move(clickedX, clickedY) {
        this.posX = clickedX;
        this.posY = clickedY;
    }
}