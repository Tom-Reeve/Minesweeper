const newGameButton = document.getElementById("newGameButton");
const startButton = document.getElementById("startGameButton");

const difficultyRadios = document.querySelectorAll(".hiddenL1");
const customRadio = document.getElementById("customRadio");

const customInput = document.querySelectorAll(".hiddenL2");

function newGame() {
    newGameButton.disabled = true;
    startButton.disabled = true;
    for (let div of difficultyRadios) {
        div.style.display = "flex";
    }
    difficultyRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            startButton.disabled = false;
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
    })
}