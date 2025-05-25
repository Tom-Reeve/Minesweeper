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
                } else if (event.button === 2) {
                    if (!cell.flagged) {
                        this.flagCell(cell);
                    } else {
                        this.unflagCell(cell);
                    }
                }
  };
            }
        }
    }
    checkCell(cell) {
        if (this.gameOver) {
            return;
        }
        cell.isCurrentCell = true;
        if (this.firstCell) {
            this.firstCell = false;
            this.placeMines();
        }
        if (cell.isMine) {
            game.gameOver = true;
            this.revealAll();
        } else {
            cell.reveal();
            if (cell.neighbourMineCount === 0) {
                this.activateFloodfill(cell);
            }
            this.checkWin();
        }
    }
    flagCell(cell) {
        if (game.gameOver) {
            return;
        }
        cell.flag();
        this.flags++;
    }
    unflagCell(cell) {
        if (this.gameOver) {
            return;
        }
        cell.unflag();
        this.flags--;
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

        
    }
    activateFloodfill(firstCell) {
        for (let i = -1 ; i <= 1 ; i++) {
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
        }
    }
    revealAll() {
        for (let i = 0 ; i < this.board.length ; i++) {
            for (let j = 0 ; j < this.board[0].length ; j++) {
                let cell = this.board[i][j];
                cell.reveal();
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
            alert("YOU WIN");
        }
    }
}