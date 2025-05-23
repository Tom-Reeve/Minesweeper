const difficultyRadios = document.querySelectorAll(".hiddenL1");
const customDifficulty = document.getElementById("customRadio");

const difficultyCustom = document.querySelectorAll(".hiddenL2");

function newGame() {
    for (let div of difficultyRadios) {
        div.style.display = "flex";
    }
    difficultyRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (customDifficulty.checked) {
                for (let div of difficultyCustom) {
                    div.style.display = "flex";
                }
            } else {
                for (let div of difficultyCustom) {
                    div.style.display = "none";
                }
            }
        })
    })
}