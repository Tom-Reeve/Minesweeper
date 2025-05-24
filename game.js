class Game {
    constructor(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;

        this.cellSize = 20;

        this.flags = 0;
        this.board = this.createBoard();
        this.boardParent = document.getElementById("board");
        this.startTime = null;
    }
    createBoard() {
        let board = [];
        this.boardElement;
        for (let row = 0 ; row < this.rows ; row++) {
            let currentRow = [];
            for (let col = 0 ; col < this.cols ; col++) {
                let cell = new Cell(row, col, this.cellSize);
                currentRow.push(cell);
            }
            board.push(currentRow);
        }
        return board;
    }
    displayBoard() {
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
        alert(cell.isMine);
    }
}