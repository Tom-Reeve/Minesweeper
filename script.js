const newGameButton = document.getElementById("newGameButton");
const startButton = document.getElementById("startGameButton");

const difficultyRadios = document.querySelectorAll(".hiddenL1");
const customRadio = document.getElementById("customRadio");

let allRadios = document.querySelectorAll("input[type='radio']");
let allInputs = document.querySelectorAll("input[type='number']");

const customInput = document.querySelectorAll(".hiddenL2");

let game;

function newGame() {
    newGameButton.disabled = true;
    startButton.disabled = false;
    for (let div of difficultyRadios) {
        div.style.display = "flex";
    }
    for (let radio of allRadios) {
        radio.disabled = false;
    }
    for (let input of allInputs) {
        input.disabled = false;
    }
    difficultyRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (customRadio.checked) {
                for (let div of customInput) {
                    div.style.display = "flex";
                }
            } else {
                for (let div of customInput) {
                    div.style.display = "none";
                }
            }
        })
    });
}

let difficulty = {
    easy: {
        width: 8,
        height: 8,
        mines: 10,
    },
    intermediate: {
        width: 16,
        height: 16,
        mines: 40,
    },
    hard: {
        width: 30,
        height: 16,
        mines: 99,
    }
}

function startGame() {
    for (let radio of allRadios) {
        radio.disabled = true;
    }
    for (let input of allInputs) {
        input.disabled = true;
    }
    newGameButton.disabled = false;
    startButton.disabled = true;

     const selected = document.querySelector("input[name='difficulty']:checked").value;
     if (selected !== "custom") {
        let presets = difficulty[selected];
        game = new Game(presets.width, presets.height, presets.mines);
     } else {
        let width = document.getElementById("customX").value;
        width = width <= 30 ? width : 30;
        let height = document.getElementById("customY").value;
        height = height <= 30 ? height : 30;
        let mines = document.getElementById("customCount").value;
        mines <= (width * height) - 1 ? mines : (width * height) - 1;

        game = new Game(width, height, mines);
     }
     game.displayBoard();
}