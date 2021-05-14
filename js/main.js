document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("canvasGame");
    let cantColumnas = document.getElementById("columnas");
    let cantFilas = document.getElementById("filas");
    let modificar = document.getElementById("modifTablero");
    let reset = document.getElementById("reset");
    let playAgain = document.getElementById("playAgain");
    let baseWidth = 1350;
    let baseHeight = 700;
    canvas.width = baseWidth;
    canvas.height = baseHeight;
    let ctx = canvas.getContext("2d");
    let columnas = 7;
    let filas = 6;

    let juego;

    //Movimiento de las fichas
    canvas.addEventListener("mousedown", (eMouseDown) => {
        if (juego.checkHit(eMouseDown.offsetX, eMouseDown.offsetY)) {
            canvas.addEventListener("mousemove", (eMouseMove) => {
                juego.handleDrag(eMouseMove.offsetX, eMouseMove.offsetY);
            });
        }
    });

    //Dropeo de las fichas
    canvas.addEventListener("mouseup", (eMouseUp) => {
        canvas.removeEventListener("mousemove", juego.handleDrag);
        juego.stopDragging();
    });

    //Nueva instancia del juego
    nuevojuego = (col, fil, width, height) => {
        juego = new Juego(ctx, width, height, col, fil);
        juego.draw();
    }

    //Inicio del juego
    nuevojuego(columnas, filas, baseWidth, baseHeight);

    //Modificacion de la cantidad de filas y columnas del tablero
    modificar.addEventListener("click", () => {
        //Se limitan la cantidad de filas y columnas permitidas para que no resulte incomodo de jugar
        if (cantColumnas.value != "" && cantColumnas.value >= 4 && cantColumnas.value <= 12) {
            if (cantFilas.value != "" && cantFilas.value >= 4 && cantFilas.value <= 12) {
                col = cantColumnas.value;
                fil = cantFilas.value;
                canvas.width = baseWidth + (baseWidth / col * 2);
                canvas.height = baseHeight + (baseHeight / fil * col);
                nuevojuego(col, fil, canvas.width, canvas.height);
            } else if (cantFilas.value <= 4) {
                alert("Se insertaron pocas filas!");
            } else {
                alert("Se insertaron demasiadas filas!");
            }
        } else if (cantColumnas.value <= 4) {
            alert("Se insertaron pocas columnas!");
        } else {
            alert("Se insertaron demasiadas columnas!");
        }
    });

    //Reset del juego
    reset.addEventListener("click", () => {
        resetGame();
    });

    //Reset del juego cuando se termino (hubo un ganador)
    playAgain.addEventListener("click", () => {
        resetGame();
    });

    //Funcion de reseteo del juego
    resetGame = () => {
        canvas.width = baseWidth;
        canvas.height = baseHeight;
        nuevojuego(columnas, filas, canvas.width, canvas.height);
    }
});