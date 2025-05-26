/*const cellColours = {
    1: "blue",
    2: "green",
    3: "red",
    4: "pink",
    5: "orange",
    6: "yellow",
    7: "brown",
    8: "black",
}*/

const cellColours = {
    1: "#0000CC", // Deep Blue (classic look)
    2: "#2E8B57", // Sea Green
    3: "#B22222", // Firebrick
    4: "#C71585", // Medium Violet Red
    5: "#FF8C00", // Dark Orange
    6: "#DAA520", // Goldenrod
    7: "#8B4513", // Saddle Brown
    8: "#696969", // Dim Gray
};

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