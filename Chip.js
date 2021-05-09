class Chip {
    constructor(posX, posY, color, radius, context){
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.radius = radius;
        this.context = context
    }
    draw(){
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2* Math.PI);
        this.context.fill();
        this.context.closePath();
    }
    isHitted(clickedX, clickedY){
        return Math.sqrt((clickedX-this.posX) ** 2 + (clickedY - this.posY) ** 2) < this.radius;
    }
    move(clickedX, clickedY){
        this.posX = clickedX;
        this.posY = clickedY;
    }
}