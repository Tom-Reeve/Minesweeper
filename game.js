const runTimer = document.getElementById("runTimer");
const flagsLeft = document.getElementById("flagsLeft");
const runClicks = document.getElementById("clicks");
const revealed = document.getElementById("revealed");

const result = document.getElementById("wonLost");
const resultWrapper = document.querySelector(".result");

class Game {
    constructor(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;

        this.cellSize = 20;

        this.firstCell = true;
        this.flags = 0;
        this.board = this.createBoard();
        this.boardParent = document.getElementById("board");
        this.startTime = null;
        this.timer;
        this.clicks = 0;

        this.gameOver = false;
    }
    createBoard() {
        let board = [];
        this.boardElement;
        for (let col = 0 ; col < this.cols ; col++) {
            let currentRow = [];
            for (let row = 0 ; row < this.rows ; row++) {
                let cell = new Cell(row, col, this.cellSize);
                currentRow.push(cell);
            }
            board.push(currentRow);
        }
        return board;
    }
    displayBoard() {
        const parent = document.getElementById('board');
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }


        let width = this.cellSize * this.rows;
        let height = this.cellSize * this.cols;

        this.boardParent.style.width = width + "px";
        this.boardParent.style.height = height + "px";

        for (let i = 0 ; i < this.board.length ; i++) {
            let row = this.board[i];
            for (let j = 0 ; j < row.length ; j++) {
                let cell = this.board[i][j];
                
                cell.render(this.boardParent);

                window.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                });

                cell.element.onmousedown = (event) => {
                    if (event.button === 0) {
                        this.checkCell(cell);
                    } else if (event.button === 1) {
                        this.activateChording(cell);
                    } else if (event.button === 2) {
                        if (!cell.flagged) {
                            this.flagCell(cell);
                        } else {
                            this.unflagCell(cell);
                        }
                    }
                    if (!this.gameOver) {
                        this.clicks++;
                        runClicks.innerHTML = this.clicks;
                    }
                }
            }
        }
        flagsLeft.innerHTML = this.mines;
    }
    checkCell(cell) {
        if (this.gameOver) {
            return;
        }
        cell.isCurrentCell = true;
        if (this.firstCell) {
            this.firstCell = false;
            this.startTime = Date.now();
            this.placeMines();
            this.startTimer();
            this.percentRevealed();

            resultWrapper.style.backgroundColor = "white";
            result.innerHTML = " - ";
        }
        if (cell.isMine) {
            game.gameOver = true;
            this.revealAll();
            clearInterval(this.timer);

            result.innerHTML = "LOST";
            resultWrapper.style.backgroundColor = "red";
        } else {
            cell.reveal();
            if (cell.neighbourMineCount === 0) {
                this.activateFloodfill(cell);
            }
            this.percentRevealed();
            this.checkWin();
        }
    }
    percentRevealed() {
        let revealedCount = 0;
        for (let col = 0 ; col < this.cols ; col++) {
            for (let row = 0 ; row < this.rows ; row++) {
                let cell = this.board[col][row];
                if (cell.revealed) {
                    revealedCount++;
                }
            }
        }
        let totalCells = (this.rows * this.cols) - this.mines;
        let percent = ((revealedCount / totalCells) * 100).toFixed(2);

        revealed.innerHTML = percent;
    }
    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
            const elapsed = (Date.now() - this.startTime) / 1000;
            if (!this.gameOver) {
                runTimer.innerHTML = Math.floor(elapsed);
            }
        }, 100);
    }
    flagCell(cell) {
        if (this.gameOver || cell.revealed) {
            return;
        }
        cell.flag();
        this.flags++;
        flagsLeft.innerHTML = this.mines - this.flags;
    }
    unflagCell(cell) {
        if (this.gameOver) {
            return;
        }
        cell.unflag();
        this.flags--;
        flagsLeft.innerHTML = this.mines - this.flags;
    }
    placeMines() {
        let placedMines = 0;
        while (placedMines < this.mines) {
            let randomX = Math.floor(Math.random() * this.cols);
            let randomY = Math.floor(Math.random() * this.rows);

            let chosenCell = this.board[randomX][randomY];

            if (!chosenCell.isCurrentCell && !chosenCell.isMine) {
                chosenCell.isMine = true;
                placedMines++;
            }
        }
        this.updateCellNeighbours();
    }
    updateCellNeighbours() {
        /*let offsetCell;
        let mineCount = 0;

        for (let col = 0 ; col < this.cols ; col++) {
            for (let row = 0 ; row < this.rows ; row++) {
                let cell = this.board[row][col];
                cell.isCurrentCell = true;

                for (let i = -1 ; i <= 1 ; i++) {
                    for (let j = -1 ; j <= 1 ; j++) {
                        let yOffset = cell.y + i;
                        let xOffset = cell.x + j;

                        if (yOffset >= 0 && yOffset <= this.rows - 1) {
                            if (xOffset >= 0 && xOffset <= this.cols - 1) {
                                offsetCell = this.board[yOffset][xOffset];
                                if (!offsetCell.isCurrentCell) {
                                    if (offsetCell.isMine) {
                                        mineCount++;
                                    }
                                }
                            }
                        }
                    }
                }
                cell.neighbourMineCount = mineCount;
                if (cell.isMine) {
                    cell.neighbourMineCount = -1;
                }

                cell.isCurrentCell = false;
                mineCount = 0;
            }
        }*/

        let offsetCell;
        let mineCount = 0;

        for (let col = 0 ; col < this.cols ; col++) {
            for (let row = 0 ; row < this.rows ; row++) {
                let cell = this.board[col][row];
                cell.isCurrentCell = true;

                for (let i = -1 ; i <= 1; i++) {
                    for (let j = -1 ; j <= 1 ; j++) {
                        let colOffset = cell.x + i;
                        let rowOffset = cell.y + j;

                        if (colOffset >= 0 && colOffset <= this.rows - 1) {
                            if (rowOffset >= 0 && rowOffset <= this.cols - 1) {
                                offsetCell = this.board[rowOffset][colOffset];
                                if (!offsetCell.isCurrentCell) {
                                    if (offsetCell.isMine) {
                                        mineCount++;
                                    }
                                }
                            }
                        }
                    }
                }
                cell.neighbourMineCount = mineCount;
                if (cell.isMine) {
                    cell.neighbourMineCount = -1;
                }

                cell.isCurrentCell = false;
                mineCount = 0;
            }
        }
    }
    activateFloodfill(firstCell) {
        /*for (let i = -1 ; i <= 1 ; i++) {
            for (let j = -1 ; j <= 1 ; j++) {
                let yOffset = firstCell.y + i;
                let xOffset = firstCell.x + j;

                if (yOffset >= 0 && yOffset <= this.rows - 1) {
                    if (xOffset >= 0 && xOffset <= this.cols - 1) {
                        let offsetCell = this.board[yOffset][xOffset];
                        if (!offsetCell.isCurrentCell) {
                            if (!offsetCell.revealed) {
                                if (!offsetCell.flagged) {
                                    offsetCell.reveal();
                                    if (offsetCell.neighbourMineCount === 0) {
                                        this.activateFloodfill(offsetCell);
                                    }
                                }
                            }  
                        }
                    }
                }
            }
        }*/

        for (let i = -1 ; i <= 1; i++) {
            for (let j = -1 ; j <= 1 ; j++) {
                let colOffset = firstCell.x + i;
                let rowOffset = firstCell.y + j;

                if (colOffset >= 0 && colOffset <= this.rows - 1) {
                    if (rowOffset >= 0 && rowOffset <= this.cols - 1) {
                        let offsetCell = this.board[rowOffset][colOffset];
                        if (!offsetCell.isCurrentCell) {
                            if (!offsetCell.revealed) {
                                if (!offsetCell.flagged) {
                                    offsetCell.reveal();
                                    if (offsetCell.neighbourMineCount === 0) {
                                        this.activateFloodfill(offsetCell);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.percentRevealed();
    }
    revealAll() {
        for (let i = 0 ; i < this.board.length ; i++) {
            for (let j = 0 ; j < this.board[0].length ; j++) {
                let cell = this.board[i][j];
                cell.reveal();
            }
        }
    }
    activateChording(cell) {
        if (this.gameOver) {
            return;
        }
        let flagCount = 0;
        let neigbourCells = [];
        for (let i = -1 ; i <= 1; i++) {
            for (let j = -1 ; j <= 1 ; j++) {
                let colOffset = cell.x + i;
                let rowOffset = cell.y + j;

                if (colOffset >= 0 && colOffset <= this.rows - 1) {
                    if (rowOffset >= 0 && rowOffset <= this.cols - 1) {
                        let offsetCell = this.board[rowOffset][colOffset];
                        if (offsetCell.flagged) {
                            flagCount++;
                        }
                        neigbourCells.push(offsetCell);
                    }
                }
            }
        }
        if (flagCount === cell.neighbourMineCount) {
            for (let cell of neigbourCells) {
                if (!cell.flagged && !cell.revealed) {
                    this.checkCell(cell);
                }
            }
        }
    }
    checkWin() {
        let revealedCells = 0;

        for (let i = 0 ; i < this.board.length ; i++) {
            for (let j = 0 ; j < this.board[0].length ; j++) {
                let cell = this.board[i][j];

                if (cell.revealed) {
                    revealedCells++;
                }
            }
        }
        let cellsToReveal = (this.rows * this.cols) - this.mines;
        if (cellsToReveal === revealedCells) {
            this.gameOver = true;
            this.revealAll();
            clearInterval(this.timer);

            result.innerHTML = "WON";
            resultWrapper.style.backgroundColor = "green";
        }
    }
}