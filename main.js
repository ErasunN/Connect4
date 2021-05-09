document.addEventListener('DOMContentLoaded', () => {
    console.log(window);
    let canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 30;
    let ctx = canvas.getContext('2d');
    let columnas = 6;
    let filas = 5;

    let fourInLine = new Game(ctx, canvas.width, canvas.height, columnas, filas);
    fourInLine.draw();

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
            fourInLine = new Game(ctx, canvas.width, canvas.height, columnas, filas);
        } else {
            alert("Las filas y/o las columnas deben tener un valor mayor o igual a 4");
        }
    })
})