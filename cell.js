const cellColours = {
    1: "blue",
    2: "green",
    3: "red",
    4: "pink",
    5: "orange",
    6: "yellow",
    7: "brown",
    8: "black",
}

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
            this.element.classList.add("class", "clicked");
            this.element.style.backgroundColor = "lightgrey";
            this.element.innerHTML = "";

            this.element.style.color = cellColours[this.neighbourMineCount];
            this.element.innerHTML = this.neighbourMineCount > 0 ? this.neighbourMineCount : "";
            this.flagged = false;
        } else if (this.isMine && !this.flagged){
            this.element.innerHTML = "&#x1F4A3;";
        }
        this.revealed = true;
    }
    flag() {
        if (this.revealed) {
            return;
        }
        this.flagged = true;
        this.element.innerHTML = "&#x1F6A9;";
    }
    unflag() {
        if (this.revealed) {
            return;
        }
        this.flagged = false;
        this.element.innerHTML = "";
    }
}