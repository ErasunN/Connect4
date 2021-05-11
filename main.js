document.addEventListener('DOMContentLoaded', () => {
    //Constantes
    const MARGIN = 0.02; //Valor para fraccionar
    //Tomo el canvas
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    //Armo filas y columnas para el tablero
    let columnas = 7;
    let filas = 6;
    //Dimensiones del canvas
    let width, height, margin;
    //Variable del juego
    let fourInLine;
    let activePlayer;

    let setDimensions = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        margin = MARGIN * Math.min(height, width);
        nuevoJuego();
    }

    let nuevoJuego = () => {
        //Creo una instancia del juego
        fourInLine = new Game(ctx, width, height, margin, columnas, filas);
        fourInLine.newGame();
    }

    canvas.addEventListener('mousedown', (eMouseDown) => {
        if (fourInLine.checkHit(eMouseDown.offsetX, eMouseDown.offsetY)) {
            canvas.addEventListener('mousemove', (eMouseMove) => {
                fourInLine.handleDrag(eMouseMove.offsetX, eMouseMove.offsetY);
            });
        }
    });

    canvas.addEventListener('mouseup', (eMouseUp) => {
        canvas.removeEventListener('mousemove', fourInLine.handleDrag);
        fourInLine.stopDragging();
    })

    document.querySelector("#cantColumnas").addEventListener("change", (e) => {
        columnas = e.target.value;
    })

    document.querySelector("#cantFilas").addEventListener("change", (e) => {
        filas = e.target.value;
    })

    document.querySelector("#setSize").addEventListener("click", () => {
        if (filas >= 4 && columnas >= 4) {
            nuevoJuego();
        } else {
            alert("Las filas y/o las columnas deben tener un valor mayor o igual a 4");
        }
    })

    //Llamados de funciones iniciales
    setDimensions();
    //Redimension
    window.addEventListener("resize", setDimensions);
})