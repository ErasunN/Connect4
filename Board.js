class Board {
    constructor(context, columnas, filas, width, height, margin) {
        this.context = context;
        this.columnas = columnas;
        this.filas = filas;
        this.tablero = [];
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.chips1 = [];
        this.chips2 = [];
        for (let i = 0; i < (columnas * filas / 2); i++) {
            this.chips1.push(new Chip(this.width * 0.1, (this.height * 0.2) + i * 20, "red", 30, this.context, 1, this.loadImage(1)));
            this.chips2.push(new Chip(this.width - this.width * 0.1, (this.height * 0.2) + i * 20, "blue", 30, this.context, 2, this.loadImage(2)));
        }

        this.turnoActivo = true;
    }

    loadImage(player) {
        let image = new Image();
        image.src = './player' + player + '.png';
        return image;
    }

    draw() {
        this.chips1.forEach(chip => {
            chip.draw();
        })
        this.chips2.forEach(chip => {
            chip.draw();
        })
    }
    getSelectedChip(posX, posY) {
        for (let i = 0; i < this.chips1.length; i++) {
            if (this.turnoActivo) {
                if (this.chips1[i].owner === 1 && this.chips1[i].isHitted(posX, posY)) {
                    return this.chips1[i];
                } else if (this.chips2[i].owner === 2 && this.chips2[i].isHitted(posX, posY)) {
                    return this.chips1[i];
                }
            }

        }
        return null;
    }

    checkMove(ficha) {
        if (!ficha.modoBloqueado) {
            let fichaX = ficha.getPosX();
            let fichaY = ficha.getPosY();
            let x = this.getColSelected(fichaX);
            let y = this.getRowAvailable(x);
            console.log(x, y)
            this.moveChip(x, y, ficha)
            ficha.modoBloqueado = true;
            this.turnoActivo = !this.turnoActivo;
            return true;
        }
    }

    moveChip(columna, fila, ficha) {
        this.tablero[fila][columna].estado = "ocupado";
        let posX = this.tablero[fila][columna].blankSpace.posX + (this.tablero[fila][columna].blankSpace.width / 2)
        let posY = this.tablero[fila][columna].blankSpace.posY + (this.tablero[fila][columna].blankSpace.height / 2)
        ficha.move(posX, posY);
    }

    getRowAvailable(index) {
        let contador = this.tablero.length - 1;
        let retorned;
        let retornedStatus = false;
        for (let i = contador; i >= 0; i--) {
            if (retornedStatus == false && this.getColSelected != null && this.tablero[i][index].blankSpace.estado == "disponible") {
                retornedStatus = true;
                retorned = i;
                return retorned;
            }
        }
    }

    getColSelected(posX) {
        for (let i = 0; i < this.tablero.length; i++) {
            if (posX >= this.tablero[0][i].blankSpace.posX && posX <= this.tablero[0][i].blankSpace.posX + this.tablero[0][i].blankSpace.width) {
                // return this.tablero[0][i].posX;
                return i
            }
        }
    }

    createHitBox(col, row, x, y, w) {
        let blankSpace = {
            posX: x,
            posY: y,
            width: w,
            height: w,
            estado: "disponible"
        };
        this.tablero[col][row].newHitBox(blankSpace);
    }

    createGrid() {
        this.tablero = [];
        let cell, marginX, marginY;

        //Traduccion de la cuenta:
        //Corroboro si el ((ancho - margen * 2(uno por cada lado)) * filas / columnas) es menor a el (alto - margen * 2)
        //Y de esta manera llego a saber si la pantalla es vertical u horizontal y asi reajustar el tablero
        if ((this.width - this.margin * 2) * this.filas / this.columnas < this.height - this.margin * 2) {
            // Pantalla vertical
            cell = (this.width - this.margin * 2) / this.columnas;
            marginX = this.margin;
            marginY = (this.height - cell * this.filas) / 2;
        } else {
            // Pantalla Horizontal
            cell = (this.height - this.margin * 2) / this.filas;
            marginX = (this.width - cell * this.columnas) / 2;
            marginY = this.margin;
        }

        // Creao una grilla para el trablero
        for (let i = 0; i < this.filas; i++) {
            this.tablero[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                let left = marginX + j * cell;
                let top = marginY + i * cell;
                this.tablero[i][j] = new Cell(left, top, cell, cell, i, j);
                this.createHitBox(i, j, left, top, cell);
            }
        }
        this.drawGrid()
    }

    drawGrid() {
        //Creo la celda y el "pie" del tablero
        let cell = this.tablero[0][0];
        let ch = cell.h * this.filas;
        let cw = cell.w * this.columnas;
        this.context.fillStyle = "gray";
        this.context.fillRect(cell.left, cell.top, cw, ch);
        this.context.fillStyle = "royalblue";
        //Calculos para tener la base del tablero adaptable
        this.context.fillRect(cell.left - this.margin / 2, cell.top + ch - this.margin / 2, cw + this.margin, this.margin);

        // Dibujo cada celda
        for (let row of this.tablero) {
            for (let cell of row) {
                cell.draw(this.context);
            }
        }
    }

    checkWin(row, col) {
        // Armo las variables para las posibles combinaciones ganadoras de celdas
        let diagL = [],
            diagR = [],
            horiz = [],
            vert = [];
        for (let i = 0; i < GRID_ROWS; i++) {
            for (let j = 0; j < GRID_COLS; j++) {

                // Horizontal
                if (i == row) {
                    horiz.push(grid[i][j]);
                }

                // Vertical
                if (j == col) {
                    vert.push(grid[i][j]);
                }

                // Diagonal hacia abajo
                if (i - j == row - col) {
                    diagL.push(grid[i][j]);
                }

                // Diagonal hacia arriba
                if (i + j == row + col) {
                    diagR.push(grid[i][j]);
                }
            }
        }

        // Devuelvo si hay 4 en linea, por lo que hay un ganador
        return this.connect4(diagL) || this.connect4(diagR) || this.connect4(horiz) || this.connect4(vert);
    }

    connect4(cells = []) {
        let count = 0,
            lastOwner = null;
        let winningCells = [];
        for (let i = 0; i < cells.length; i++) {

            // No tiene un jugador, se vacia el contador
            if (cells[i].owner == null) {
                count = 0;
                winningCells = [];
            }

            // Encuentro una celda con un jugador encontrado previamente, aumento el contador y agrego la celda al arreglo
            else if (cells[i].owner == lastOwner) {
                count++;
                winningCells.push(cells[i]);
            }

            // Nuevo "duenio" de la celda, nuevo contador
            else {
                count = 1;
                winningCells = [];
                winningCells.push(cells[i]);
            }

            // Pongo un ultimo "duenio" para la celda
            lastOwner = cells[i].owner;

            // Encuentro 4 celdas con el mismo "duenio", el "duenio" es el ganador
            if (count == 4) {
                for (let cell of winningCells) {
                    cell.winner = true;
                }
                return true;
            }
        }
        return false;
    }

    highlightCell(x, y, playersTurn) {
        let col = null;
        for (let row of this.tablero) {
            for (let cell of row) {

                // Saco el resaltado actual
                cell.highlight = null;

                // Obtengo la columna
                if (cell.contains(x, y)) {
                    col = cell.col;
                }
            }
        }

        if (col == null) {
            return;
        }

        // Agarro la primera celda desocupada
        for (let i = this.filas - 1; i >= 0; i--) {
            if (this.tablero[i][col].owner == null) {
                this.tablero[i][col].highlight = playersTurn;
                return this.tablero[i][col];
            }
        }
        return null;
    }

    highlightGrid(playersTurn, gameOver, x, y) {
        if (!playersTurn || gameOver) {
            return;
        }
        this.highlightCell(x, y, playersTurn);
    }

    selectCell() {
        let highlighting = false;
        for (let row of this.tablero) {
            for (let cell of row) {
                if (cell.highlight != null) {
                    highlighting = true;
                    cell.highlight = null;
                    cell.owner = playersTurn;
                    if (this.checkWin(cell.row, cell.col)) {
                        gameOver = true;
                    }
                    break;
                }
            }
        }

        // No permito seleccionar si no esta resaltado
        if (!highlighting) {
            return;
        }

        // Checkeo por si el juego esta empatado
        if (!gameOver) {
            gameTied = true;
            for (let row of grid) {
                for (let cell of row) {
                    if (cell.owner == null) {
                        gameTied = false;
                        break;
                    }
                }
            }

            // Fin del juego
            if (gameTied) {
                gameOver = true;
            }
        }

        // Si el juego no se termino, cambio de turno
        if (!gameOver) {
            playersTurn = !playersTurn;
        }
    }
}