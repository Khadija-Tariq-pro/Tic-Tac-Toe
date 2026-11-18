let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turn0 = true;

const winningPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    enableBox();
    turn0 = true;
    msgContainer.classList.add("hide");
}

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if(turn0){
            box.innerText = "O";
            box.style.color = "#d2746f";
            turn0 = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "#194350";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
        count();
    });
});
const disableBox = () => {
    for(box of boxes){
        box.disabled = true;
    }
}
const enableBox = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) =>{
    msg.innerText = `Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox();
}

const checkWinner = () =>{
    for(let patterns of winningPattern){
        let posV1 = boxes[patterns[0]].innerText;
        let posV2 = boxes[patterns[1]].innerText;
        let posV3 = boxes[patterns[2]].innerText;

        if(posV1 != "" && posV2 != "" && posV3 != ""){
            if(posV1 === posV2 && posV2 === posV3){
                showWinner(posV1);
                return true;
            }
        }
    }
    return false;
}
const count = () => {

    // First check whether someone has won
    if (checkWinner()) {
        return;
    }

    // If no winner, count filled boxes
    let filledBoxes = 0;

    boxes.forEach(box => {
        if (box.innerText !== "") {
            filledBoxes++;
        }
    });

    // If all 9 boxes are filled, declare draw
    if (filledBoxes === 9) {
        msg.innerText = "This game is Draw";
        msgContainer.classList.remove("hide");
        disableBox();
    }
};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);