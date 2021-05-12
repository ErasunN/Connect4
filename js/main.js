document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("canvasGame");
    let cantColumnas = document.getElementById("columnas");
    let cantFilas = document.getElementById("filas");
    let modificar = document.getElementById("modifTablero");
    let reset = document.getElementById("reset");
    let playAgain = document.getElementById("playAgain");
    let baseWidth = window.innerWidth;
    let baseHeight = window.innerHeight;
    canvas.width = baseWidth;
    canvas.height = baseHeight;
    let ctx = canvas.getContext("2d");
    let columnas = 7;
    let filas = 6;

    let juego;

    canvas.addEventListener("mousedown", (eMouseDown) => {
        if (juego.checkHit(eMouseDown.offsetX, eMouseDown.offsetY)) {
            canvas.addEventListener("mousemove", (eMouseMove) => {
                juego.handleDrag(eMouseMove.offsetX, eMouseMove.offsetY);
            });
        }
    });

    canvas.addEventListener("mouseup", (eMouseUp) => {
        canvas.removeEventListener("mousemove", juego.handleDrag);
        juego.stopDragging();
    });



    nuevojuego = (col, fil, width, height) => {
        juego = new Juego(ctx, width, height, col, fil);
        juego.draw();
    }

    nuevojuego(columnas, filas, baseWidth, baseHeight);
    modificar.addEventListener("click", () => {
        if (cantColumnas.value != "" && cantColumnas.value >= 4 && cantColumnas.value <= 12) {
            if (cantFilas.value != "" && cantFilas.value >= 4 && cantFilas.value <= 12) {
                col = cantColumnas.value;
                fil = cantFilas.value;
                canvas.width = baseWidth + ((baseWidth * col * 2) / 100);
                canvas.height = baseHeight + ((baseHeight * fil * fil) / 100);
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

    reset.addEventListener("click", () => {
        resetGame();
    });

    playAgain.addEventListener("click", () => {
        resetGame();
    });

    resetGame = () => {
        canvas.width = baseWidth;
        canvas.height = baseHeight;
        nuevojuego(columnas, filas, canvas.width, canvas.height);
    }
});