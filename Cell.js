//Constantes
const BACK_COLOR = "mintcream";
const COLOR_WIN = "black";
const COLOR_PLAY = "yellow";
const COLOR_COMP = "red";
const GRID_CIRCLE = 0.7; //El circulo dentro de la celda es de una fraccion del tamanio

class Cell {
    constructor(left, top, w, h, row, col) {
        this.bot = top + h;
        this.left = left;
        this.right = left + w;
        this.top = top;
        this.w = w;
        this.h = h;
        this.row = row;
        this.col = col;
        this.cx = left + w / 2;
        this.cy = top + h / 2;
        this.r = w * GRID_CIRCLE / 2;
        this.highlight = null;
        this.owner = null;
        this.winner = false;
    }

    contains(x, y) {
        return x > this.left && x < this.right && y > this.top && y < this.bot;
    }

    // draw the circle or hole
    draw(ctx) {
        // Color del jugador
        let color = this.owner == null ? BACK_COLOR : this.owner ? COLOR_PLAY : COLOR_COMP;
        // Dibujar el circulo
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
        ctx.fill();
        // Dibujar el resaltado
        if (this.winner || this.highlight != null) {

            // Verificacion de color
            color = this.winner ? COLOR_WIN : this.highlight ? COLOR_PLAY : COLOR_COMP;

            // Dibujar perimetro
            ctx.lineWidth = this.r / 4;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}