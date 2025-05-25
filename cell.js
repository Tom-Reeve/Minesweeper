class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.element;
        this.isCurrentCell = false;

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
    reveal() {
        if (!this.isMine) {
            this.element.classList.remove("class", "flagged");
            this.element.classList.add("class", "clicked");
            this.element.style.backgroundColor = "lightgrey";
            this.element.innerHTML = this.neighbourMineCount;
        } else {
            this.element.classList.add("class", "exploded");
        }
        this.revealed = true;
    }
    flag() {
        if (this.revealed) {
            return;
        }
        this.flagged = true;
        this.element.classList.add("class", "flagged");
        this.element.style.backgroundColor = "green";
    }
    unflag() {
        if (this.revealed) {
            return;
        }
        this.flagged = false;
        this.element.classList.remove("class", "flagged");
        this.element.style.backgroundColor = "grey";
    }
}