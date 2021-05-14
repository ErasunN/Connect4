class Tablero {
    constructor(ctx, gameover, columnas, filas, width, height) {
        this.ctx = ctx;
        this.player1 = [];
        this.player2 = [];
        this.espacios = [
            []
        ];
        this.columna = [];
        this.columnas = columnas;
        this.filas = filas;
        this.width = width;
        this.height = height;
        this.turnoActivo = Math.random() < .5;
        this.gameover = gameover;
        this.firstTurn = true;

        this.loadImagePlayer(1);
        this.loadImagePlayer(2);
        this.createHitBox();
        this.showTurn();
    }

    //Dibuja un marcador para el jugador que tiene el turno
    showTurn() {
        if (this.firstTurn) {
            this.firstTurn = !this.firstTurn;
            if (this.turnoActivo) {
                this.ctx.beginPath();
                this.ctx.fillStyle = 'blue';
                this.ctx.arc(this.width * 0.1, this.height * 0.2, 50, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.beginPath();
                this.ctx.fillStyle = 'red';
                this.ctx.arc(this.width - this.width * 0.1, this.height * 0.2, 50, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        if (this.turnoActivo) {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'blue';
            this.ctx.arc(this.width * 0.1, this.height * 0.2, 50, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'red';
            this.ctx.arc(this.width - this.width * 0.1, this.height * 0.2, 50, 0, Math.PI * 2);
            this.ctx.fill();
        }
        return this.turnoActivo;
    }

    //Carga las imagenes para las fichas
    loadImagePlayer(player) {
        var img = new Image();
        img.src = './image/player' + player + '.png';
        img.onload = () => {
            for (let i = 0; i < this.columnas * this.filas / 2; i++) {
                if (player === 1) {
                    this.player1.push(new Ficha(this.width * 0.1, this.height - this.height * 0.3, 46, img, this.ctx, 1));
                } else {
                    this.player2.push(new Ficha(this.width - this.width * 0.1, this.height - this.height * 0.3, 46, img, this.ctx, ));
                }
            }
        }
    }

    //Dibuja el tablero
    draw() {
        this.espacios.forEach(espacio => {
            espacio.forEach(espaci => {
                this.ctx.beginPath();
                this.ctx.fillStyle = 'royalblue';
                this.ctx.fillRect(espaci.posX, espaci.posY, espaci.width, espaci.height);
                this.ctx.fillStyle = 'mintcream';
                this.ctx.arc(espaci.posX + (espaci.width / 2), espaci.posY + (espaci.height / 2), 35, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.rect(espaci.posX, espaci.posY, espaci.width, espaci.height);
            })
        })
        this.player1.forEach(ficha => {
            ficha.draw()
        });
        this.player2.forEach(ficha => {
            ficha.draw()
        })

    }

    //Selecciona la ficha clickeada en la posicion
    getSelectedChip(posX, posY) {
        if (this.turnoActivo) {
            for (let i = 0; i < this.player1.length; i++) {
                if (this.player1[i].hit(posX, posY)) {
                    return this.player1[i];
                }
            }
        } else {
            for (let i = 0; i < this.player2.length; i++) {
                if (this.player2[i].hit(posX, posY)) {
                    return this.player2[i];
                }
            }
        }
        return null;
    }

    //Verificacion de movimiento de la ficha
    checkMove(ficha) {
        if (!ficha.isBloqued && ficha.posX > this.espacios[0][0].posX && ficha.posX < this.espacios[this.filas - 1][this.columnas - 1].posX + this.espacios[this.filas - 1][this.columnas - 1].width) {
            let fichaX = ficha.getPosX();
            let x = this.getColSelected(fichaX);
            let y = this.getRowAvailable(x);
            this.moveChip(x, y, ficha)
            ficha.isBloqued = true;
            this.turnoActivo = !this.turnoActivo;
            //Retorna posicion "x" e "y" mas datos de utilidad
            return {
                x,
                y,
                resultado: true,
                gameover: this.checkWin(y, x)
            };
        }
    }

    //Bloquea el movimiento de las fichas
    bloquearFichas() {
        this.player1.forEach(ficha => {
            ficha.isBloqued = true
        });
        this.player2.forEach(ficha => {
            ficha.isBloqued = true
        })
    }

    //Mueve la ficha a la celda disponible del tablero
    moveChip(columna, fila, ficha) {
        this.espacios[fila][columna].estado = "ocupado";
        if (this.turnoActivo) {
            this.espacios[fila][columna].jugador = 1;
        } else {
            this.espacios[fila][columna].jugador = 2;
        }
        let posX = this.espacios[fila][columna].posX + (this.espacios[fila][columna].width / 2)
        let posY = this.espacios[fila][columna].posY + (this.espacios[fila][columna].height / 2)
        ficha.move(posX, posY);
    }

    //Busca la fila con una celda disponible en "index"
    getRowAvailable(index) {
        let contador = this.espacios.length - 1
        let retorned;
        let retornedStatus = false
        for (let i = contador; i >= 0; i--) {
            if (retornedStatus == false && this.espacios[i][index].estado == "disponible") {
                retornedStatus = true;
                retorned = i;
                return retorned;
            }
        }
    }

    //Retorna la posicion de la columna donde solte la ficha
    getColSelected(posX) {
        for (let i = 0; i <= this.espacios.length; i++) {
            if (posX >= this.espacios[0][i].posX && posX <= this.espacios[0][i].posX + this.espacios[0][i].width) {
                return i
            }
        }
    }

    //Crea una hitbox para las celdas
    createHitBox() {
        for (let y = 0; y < this.filas; y++) {
            for (let x = 0; x < this.columnas; x++) {
                let blankSpace = {
                    posX: this.width / this.columnas * 2 + (x * 90),
                    posY: this.height * 0.05 + (y * 90),
                    width: 90,
                    height: 90,
                    estado: "disponible",
                    jugador: 0
                };
                if (x == 0) {
                    this.espacios[y] = new Array(this.columnas);
                }
                this.espacios[y][x] = blankSpace;
            }
        }
    }

    //Verifica si hay un ganador
    checkWin(fila, columna) {
        if (this.gameover == false) {
            let tiedGame = 0;
            let horizontal = [];
            let vertical = [];
            let diagonalDerecha = [];
            let diagonalIzquierda = [];
            for (let i = 0; i < this.filas; i++) {
                for (let j = 0; j < this.columnas; j++) {
                    if (i == fila) {
                        horizontal.push(this.espacios[i][j]); //seteo la fila
                    }
                    if (j == columna) {
                        vertical.push(this.espacios[i][j]); //seteo columna
                    }
                    if (i - j == fila - columna) {
                        diagonalIzquierda.push(this.espacios[i][j]); //seteo diagonal iz
                    }
                    if (i + j == fila + columna) {
                        diagonalDerecha.push(this.espacios[i][j]); //seteo diagonalDerecha
                    }
                    if (this.espacios[i][j].estado === "ocupado") {
                        tiedGame++;
                    }
                }
            }
            if (tiedGame === (this.filas * this.columnas)) {
                return "tied";
            }
            return this.cuatroEnLinea(diagonalIzquierda) || this.cuatroEnLinea(diagonalDerecha) || this.cuatroEnLinea(horizontal) || this.cuatroEnLinea(vertical);
        }
    }

    //Verifica si hay una secuencia de fichas ganadoras
    cuatroEnLinea(celda = []) {
        let count = 0;
        let jugadorActivo;
        if (this.turnoActivo) {
            jugadorActivo = 1;
        } else {
            jugadorActivo = 2;
        }
        let winningCells = [];
        for (let i = 0; i < celda.length; i++) {
            if (celda[i].jugador == 0 && celda[i].estado == "disponible") {
                count = 0;
                winningCells = [];
            } else if (celda[i].jugador == jugadorActivo && celda[i].estado == "ocupado") {
                count++;
                winningCells.push(celda[i]);
            } else {
                count = 1;
                winningCells = [];
                winningCells.push(celda[i]);
            }
            jugadorActivo = celda[i].jugador;
            if (count == 4) {
                return {
                    resultado: true,
                    ganador: jugadorActivo
                }
            }
        }
        return false;
    }
}