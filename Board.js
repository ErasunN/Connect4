class Board {
    constructor(context, columnas, filas, width, height, margin) {
        this.context = context;
        this.columnas = columnas;
        this.filas = filas;
        this.tablero = [];
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.chips = [];
        this.chips.push(new Chip(15, 15, 'red', 30, this.context));
        this.chips.push(new Chip(30, 15, 'blue', 30, this.context));
        this.chips.push(new Chip(15, 30, 'green', 30, this.context));
        this.chips.push(new Chip(30, 30, 'black', 30, this.context));
    }

    draw() {
        this.chips.forEach(chip => {
            chip.draw();
        })
    }
    getSelectedChip(clickedX, clickedY) {
        for (let index = 0; index < this.chips.length; index++) {
            if (this.chips[index].isHitted(clickedX, clickedY)) {
                return this.chips[index];
            }
        }
        return null;
        // this.chips.forEach(chip => {
        //     if(chip.isHitted(clickedX, clickedY))
        //         return chip;
        // });
        // return null;
    }

    createGrid() {
        this.tablero = [];

        // set up cell size and margins
        let cell, marginX, marginY;

        // portrait
        if ((this.width - this.margin * 2) * this.filas / this.columnas < this.height - this.margin * 2) {
            cell = (this.width - this.margin * 2) / this.columnas;
            marginX = this.margin;
            marginY = (this.height - cell * this.filas) / 2;
        }

        // landscape
        else {
            cell = (this.height - this.margin * 2) / this.filas;
            marginX = (this.width - cell * this.columnas) / 2;
            marginY = this.margin;
        }

        // populate the grid
        for (let i = 0; i < this.filas; i++) {
            this.tablero[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                let left = marginX + j * cell;
                let top = marginY + i * cell;
                this.tablero[i][j] = new Cell(left, top, cell, cell, i, j);
            }
        }
        this.drawGrid()
    }

    drawGrid() {
        // frame and butt
        let cell = this.tablero[0][0];
        let fh = cell.h * this.filas;
        let fw = cell.w * this.columnas;
        this.context.fillStyle = "gray";
        this.context.fillRect(cell.left, cell.top, fw, fh);
        this.context.fillStyle = "royalblue";
        this.context.fillRect(cell.left - this.margin / 2, cell.top + fh - this.margin / 2, fw + this.margin, this.margin);

        // cells
        for (let row of this.tablero) {
            for (let cell of row) {
                cell.draw(this.context);
            }
        }
    }

    checkWin(row, col) {
        // get all the cells from each direction
        let diagL = [],
            diagR = [],
            horiz = [],
            vert = [];
        for (let i = 0; i < GRID_ROWS; i++) {
            for (let j = 0; j < GRID_COLS; j++) {

                // horizontal cells
                if (i == row) {
                    horiz.push(grid[i][j]);
                }

                // vertical cells
                if (j == col) {
                    vert.push(grid[i][j]);
                }

                // top left to bottom right
                if (i - j == row - col) {
                    diagL.push(grid[i][j]);
                }

                // top right to bottom left
                if (i + j == row + col) {
                    diagR.push(grid[i][j]);
                }
            }
        }

        // if any have four in a row, return a win!
        return connect4(diagL) || connect4(diagR) || connect4(horiz) || connect4(vert);
    }

    highlightCell(x, y) {
        let col = null;
        for (let row of grid) {
            for (let cell of row) {

                // clear existing highlighting
                cell.highlight = null;

                // get the column
                if (cell.contains(x, y)) {
                    col = cell.col;
                }
            }
        }

        if (col == null) {
            return;
        }

        // highlight the first unoccupied cell
        for (let i = GRID_ROWS - 1; i >= 0; i--) {
            if (grid[i][col].owner == null) {
                grid[i][col].highlight = playersTurn;
                return grid[i][col];
            }
        }
        return null;
    }
}