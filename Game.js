class Game {
    constructor(context, width, height, columnas, filas) {
        this.context = context;
        this.board = new Board(this.context);
        this.mode = '';
        this.selectedChip = null;
        this.width = width;
        this.height = height;
        this.columnas = columnas;
        this.filas = filas
    }

    draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.board.draw();
    }
    checkHit(clickedX, clickedY) {
        let selectedChip = this.board.getSelectedChip(clickedX, clickedY);
        if (selectedChip) {
            this.mode = 'dragging';
            this.selectedChip = selectedChip;
            return true;
        }
        return false;
    }
    handleDrag(clickedX, clickedY) {
        if (this.mode === 'dragging' && this.selectedChip) {
            this.selectedChip.move(clickedX, clickedY);
            this.draw();
        }
    }
    stopDragging() {
        this.mode = 'standBy';
    }

    checkMove() {
        if (this.board.checkMove(this.selectedChip)) {

        }
    }

}