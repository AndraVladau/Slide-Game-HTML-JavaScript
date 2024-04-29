document.addEventListener("DOMContentLoaded", () => {
    const n = 4;
    const table = document.getElementById("puzzle");
    let empty = { x: n - 1, y: n - 1 }; 

    generateTable();

    document.getElementById("restart-button").addEventListener("click", () => {
        table.innerHTML = '';
        generateTable();
    });

    function generateTable() {
        let numbers = [];
        for (let i = 1; i < n * n; i++) {
            numbers.push(i);
        }
        numbers = shuffle(numbers);
        numbers.push(null); 

        let counter = 0;
        for (let i = 0; i < n; i++) {
            const row = table.insertRow();
            for (let j = 0; j < n; j++) {
                const cell = row.insertCell();
                let num = numbers[counter++];
                if (num === null) {
                    cell.classList.add('empty');
                    cell.textContent = '';
                    empty.x = j;
                    empty.y = i;
                } else {
                    cell.textContent = num;
                }
            }
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' && empty.y < n - 1) {
            moveCell(empty.x, empty.y + 1);
        } else if (event.key === 'ArrowDown' && empty.y > 0) {
            moveCell(empty.x, empty.y - 1);
        } else if (event.key === 'ArrowLeft' && empty.x < n - 1) {
            moveCell(empty.x + 1, empty.y);
        } else if (event.key === 'ArrowRight' && empty.x > 0) {
            moveCell(empty.x - 1, empty.y);
        }
    });

    function moveCell(x, y) {
        const targetCell = table.rows[y].cells[x];
        const emptyCell = table.rows[empty.y].cells[empty.x];
        emptyCell.textContent = targetCell.textContent;
        emptyCell.classList.remove('empty');
        targetCell.textContent = '';
        targetCell.classList.add('empty');
        empty.x = x;
        empty.y = y;
        if (isGameWon()) {
            alert("Congratulations! You've won the game!");
        }
    }

    function isGameWon() {
        let count = 1;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const cell = table.rows[i].cells[j];
                if (cell.textContent !== count.toString() && !(i === n - 1 && j === n - 1 && cell.classList.contains('empty'))) {
                    return false;
                }
                count++;
            }
        }
        return true;
    }
});
