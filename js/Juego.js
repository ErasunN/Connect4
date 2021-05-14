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

    //Se verifica si el juego esta finalizado
    getGameOver() {
        return this.gameover;
    }

    //Dibuja el tablero y el turno del jugador
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.tablero.draw();
        this.showTurn();
    }

    //Obtiene la ficha "golpeada"
    checkHit(posX, posY) {
        let selectedChip = this.tablero.getSelectedChip(posX, posY);
        if (selectedChip) {
            this.mode = 'dragging';
            this.selectedChip = selectedChip;
            return true;
        }
        return false;
    }

    //Mueve la ficha de posicion
    handleDrag(posX, posY) {
        if (this.mode === 'dragging' && this.selectedChip && this.gameover == false) {
            this.selectedChip.move(posX, posY);
            this.draw();
        }
    }

    //Deja de mover la ficha
    stopDragging() {
        if (this.mode === 'dragging') {
            this.checkMove();
        }
        this.mode = 'standBy';
    }

    //Verifica el movimiento y redibuja
    checkMove() {
        let checkMove = this.tablero.checkMove(this.selectedChip);
        if (checkMove) {
            let win = this.tablero.checkWin(checkMove.y, checkMove.x);
            if (win.resultado) {
                this.tablero.bloquearFichas();
                this.showWinner(win.ganador);
            } else if (win == "tied") {
                this.showWinner(0);
            }
            this.draw();
        }
    }

    //Muestra el mensaje con el ganador
    showWinner(numero) {
        let ganador = document.getElementById("winnerModal");
        if (numero === 1) {
            ganador.innerHTML = "azul";
        } else if (numero === 2) {
            ganador.innerHTML = "rojo";
        } else {
            let title = document.getElementById("staticBackdropLabel");
            title.innerHTML = "Empate!";
            let text = document.getElementById("gameResult");
            text.innerHTML = "Hubo un empate, mejor suerte la proxima!";
        }
        let modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        modal.toggle();
    }

    //Muestra el turno del jugador
    showTurn() {
        this.tablero.showTurn();
    }

}