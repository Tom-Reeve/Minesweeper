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

        this.gameOver = false;
    }
    createBoard() {
        let board = [];
        this.boardElement;
        for (let row = 0 ; row < this.rows ; row++) {
            let currentRow = [];
            for (let col = 0 ; col < this.cols ; col++) {
                let cell = new Cell(col, row, this.cellSize);
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
                cell.element.onclick = (event) => this.checkCell(cell);
            }
        }
    }
    checkCell(cell) {
        cell.isCurrentCell = true;
        if (this.firstCell) {
            this.firstCell = false;
            this.placeMines();
        } else if (cell.isMine) {
            game.gameOver = true;
        }
    }
    placeMines() {
        let placedMines = 0;
        while (placedMines < this.mines) {
            let randomRow = Math.floor(Math.random() * this.rows);
            let randomCol = Math.floor(Math.random() * this.cols);

            let chosenCell = this.board[randomRow][randomCol];

            if (!chosenCell.isCurrentCell && !chosenCell.isMine) {
                chosenCell.isMine = true;
                placedMines++;
            }
        }
        this.updateCellNeighbours();
    }
    updateCellNeighbours() {
        let offsetCell;
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

                cell.isCurrentCell = false;
                mineCount = 0;
            }
        }
    }
    showMines() {
        for (let i = 0 ; i < this.board.length ; i++) {
            let row = this.board[i];
            for (let j = 0 ; j < row.length ; j++) {
                let cell = this.board[i][j];
                if (cell.isMine) {
                    cell.element.style.backgroundColor = "red";
                } else {
                    cell.innerHTMl = cell.neighbourMineCount;
                }
            }
        }
    }
}