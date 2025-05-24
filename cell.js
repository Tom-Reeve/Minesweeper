class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.element;

        this.isMine = false;
        this.flagged = false;
        this.revealed = false;

        this.neighbourMineCount = 0;
    }
    render(parent) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");

        cell.style.width = this.size + "px";
        cell.style.height = this.size + "px";

        parent.appendChild(cell);
        this.element = cell;
    }
}