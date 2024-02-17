let boxes= document.querySelectorAll(".box");
let resetbtn=document.querySelector(".reset");
let newbtn=document.querySelector(".newgame");
let winmsg=document.querySelector(".winner-msg");
let msg=document.querySelector(".msg");

let turno= true;
let count=0;

const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame=()=>{
    turno=true;
    count=0;
    enableBox();
    winmsg.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("box was clicked");
        if(turno){
            box.innerText="O";
            turno=false;
        }
        else{
            box.innerText="X";
            turno=true;
        }
        box.disabled=true;
        count++;

        let isWinner=checkWinner();

        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});

const  gameDraw=()=>{
    msg.innerText = `The game was a draw.`;
    winmsg.classList.remove("hide");
    disableBox();
};




const disableBox = () => {
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBox = () => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const  showWinner=(winner)=>{
    msg.innerText = `Congratulations! The winner is ${winner}`;
    winmsg.classList.remove("hide");
    disableBox();
};

const checkWinner = () => {
    for(let pattern of winPattern){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1===pos2 && pos2===pos3){
                console.log("winner is", pos1);
                showWinner(pos1);
                return true;
            }
        }
    }
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);