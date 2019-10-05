const cells = document.querySelectorAll('.cell'), // клетки
    fieldWrapper = document.querySelector('.field-wrapper'),
    newGame = document.querySelector('.new-game'), // начать новую игру
    win = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ]; // победные сочетания

let player = 'cross', // ход текущего игрока
    countSteps = 0, // кол-во ходов
    endGame = false; // индикатор канца игры
    dataCross = [], // ходы X
    dataZero = []; // ходы O

newGame.addEventListener('click', clear); // новая игра

fieldWrapper.addEventListener('click', clickCell); // шаг игрока

function clickCell(event) { // ставится крестик или нолик при нажатии
    const target = event.target;
    if (player == 'cross' && !endGame && !dataZero.includes(Number(target.dataset.num)) && !dataCross.includes(Number(target.dataset.num))) {
        target.innerHTML = 'X';
        dataCross.push(Number(target.dataset.num));
        countSteps++;
        checkEnd(dataCross);
        player = 'zero';
    } else if (player == 'zero' && !endGame && !dataZero.includes(Number(target.dataset.num)) && !dataCross.includes(Number(target.dataset.num))) {
        target.innerHTML = 'O';
        dataZero.push(Number(target.dataset.num));
        countSteps++;
        checkEnd(dataZero);
        player = 'cross';
    }
}

function clear() { // очищает поля
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        cells[i].style.background = 'black';
    }
    dataZero = [];
    dataCross = [];
    countSteps = 0;
    endGame = false;
    player = 'cross';
}

function checkEnd(data) { //проверяем завершение игры победой или ничьей
    for (let i = 0; i < win.length; i++) { // перебираем все возможные победные комбинации
        let count = 0,
            winResult = []; // массив с победной комбинацией
        for (let j = 0; j < data.length; j++) { // перебираем результаты компьютера/игрока
            if (win[i].includes(data[j])) { //проверяем соответствуют ли элементы в step данной комбинации
                count++;
                winResult.push(data[j]);
            }
        }
        if (count === 3) { // если все элементы в комбинации - победа
            for (let i = 0; i < winResult.length; i++) {
                cells[winResult[i]].style.background = "#99ff99";
            }
            endGame = true;
            return;
        } else if (countSteps == 9) {
            endGame = true;
            return;
        }
    }
}