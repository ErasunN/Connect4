class Juego {
    constructor(ctx, width, height, columnas, filas) {
        this.ctx = ctx;
        this.gameover = false;
        this.tablero = new Tablero(ctx, this.gameover, columnas, filas, width, height);
        this.mode = '';
        this.width = width;
        this.height = height;
        this.selectedChip = null;

    }

    getGameOver() {
        return this.gameover;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.tablero.draw();
        this.showTurn();
    }

    checkHit(posX, posY) {
        let selectedChip = this.tablero.getSelectedChip(posX, posY);
        if (selectedChip) {
            this.mode = 'dragging';
            this.selectedChip = selectedChip;
            return true;
        }
        return false;
    }

    handleDrag(posX, posY) {
        if (this.mode === 'dragging' && this.selectedChip && this.gameover == false) {
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
        let checkMove = this.tablero.checkMove(this.selectedChip);
        if (checkMove) {
            let win = this.tablero.checkWin(checkMove.y, checkMove.x);
            if (win.resultado) {
                this.tablero.bloquearFichas();
                this.showWinner(win.ganador);
            }
            this.draw();
        }
    }

    showWinner(numero) {
        let ganador = document.getElementById("winnerModal");
        if (numero === 1) {
            ganador.innerHTML = "azul";
        } else {
            ganador.innerHTML = "rojo";
        }
        let modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        modal.toggle();
    }

    showTurn() {
        this.tablero.showTurn();
    }

}