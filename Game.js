let timeDelta, timeLast;
let gameOver, playerTurn;

class Game {
    constructor(context, width, height, margin, columnas, filas) {
        this.context = context;
        this.board = new Board(this.context, columnas, filas, width, height, margin);
        this.mode = '';
        this.selectedChip = null;
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.columnas = columnas;
        this.filas = filas;
    }

    newGame() {
        playerTurn = true;
        this.draw();
    }

    draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.board.createGrid();
        this.board.draw(this.columnas, this.filas);
    }

    checkHit(posX, posY) {
        let selectedChip = this.board.getSelectedChip(posX, posY);
        if (selectedChip) {
            this.mode = 'dragging';
            this.selectedChip = selectedChip;
            return true;
        }
        return false;
    }

    handleDrag(posX, posY) {
        if (this.mode === 'dragging' && this.selectedChip) {
            this.selectedChip.move(posX, posY);
            this.draw();
        }
    }

    stopDragging() {
        if (this.mode === 'dragging') {
            this.checkMove();
        }
        this.mode = 'standBy';
    }

    checkMove() {
        if (this.board.checkMove(this.selectedChip)) {
            this.draw();
        }
    }
}