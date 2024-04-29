document.addEventListener("DOMContentLoaded", () => {
    const n = 5; 
    const table = document.getElementById("puzzle");
    let empty = { x: n - 1, y: n - 1 }; 

    generateTable();

    document.getElementById("restart-button").addEventListener("click", () => {
        table.innerHTML = '';
        generateTable();
    });

  
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key === 'ArrowUp') {
            moveCell(empty.x, empty.y + 1);
        } else if (key === 'ArrowDown') {
            moveCell(empty.x, empty.y - 1);
        } else if (key === 'ArrowLeft') {
            moveCell(empty.x + 1, empty.y);
        } else if (key === 'ArrowRight') {
            moveCell(empty.x - 1, empty.y);
        }
    });

    function generateTable() {
        const totalCells = n * n;
        const cellIndexes = [...Array(totalCells).keys()];

        shuffle(cellIndexes);

        let counter = 0;
        for (let i = 0; i < n; i++) {
            const row = table.insertRow();
            for (let j = 0; j < n; j++) {
                const cell = row.insertCell();
                if (counter < totalCells - 1) {
                    const index = cellIndexes[counter];
                    const x = index % n;
                    const y = Math.floor(index / n);
                    cell.style.backgroundPosition = "-" + (x * 100) + "px -" + (y * 100) + "px";
                    cell.addEventListener('click', () => {
                        moveCell(x, y);
                    });
                } else {
                    cell.classList.add('empty');
                    empty.x = j;
                    empty.y = i;
                }
                counter++;
            }
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function moveCell(x, y) {
        const dx = Math.abs(empty.x - x);
        const dy = Math.abs(empty.y - y);
    
        if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
            const targetCell = table.rows[y].cells[x];
            const emptyCell = table.rows[empty.y].cells[empty.x];
    
            const tempBackgroundPosition = targetCell.style.backgroundPosition;
            targetCell.style.backgroundPosition = emptyCell.style.backgroundPosition;
            emptyCell.style.backgroundPosition = tempBackgroundPosition;
    
            targetCell.classList.add('empty');
            emptyCell.classList.remove('empty');
    
            empty.x = x;
            empty.y = y;
        }
    }
    
});
