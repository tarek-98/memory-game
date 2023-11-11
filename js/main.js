let start = document.querySelector(".control span")
start.onclick = function()
{
    let theName = prompt("Enter Your Name");

    if(theName == null || theName == "")
    {
        document.querySelector(".info .name span").innerHTML = "Unknown"
    }else
    {
        document.querySelector(".info .name span").innerHTML = theName
    }

    document.querySelector(".control").remove();
    document.querySelector(".start").play();
    let div = document.getElementById("time")
        function countdoown(){
        div.innerHTML -= 1 ;
        if(div.innerHTML === "0"){
            clearInterval(counting);
            endGame();
            blockContainer.classList.add("noclick")
        }
        if(count === 10){
            clearInterval(counting);
        }
}
let counting = setInterval(countdoown , 1000)  
}

let duration = 1000;
let blockContainer = document.querySelector(".memory-game-block")
let blocks = Array.from(blockContainer.children);
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);
let count = 0;
blocks.forEach((block, index) => {

    block.style.order = orderRange[index]

    //add click
    block.addEventListener("click", function(){
        flippBlock(block); 
    })
})

function flippBlock (selectedBox)
{
    selectedBox.classList.add("flipped");
    //cllocet all flipped block
    let allFlippedBlock = blocks.filter(flippBlock => flippBlock.classList.contains("flipped"));
    //if two selected block
    if(allFlippedBlock.length === 2)
    {
        //stop clicking function
        stopClicking();
        //checked matched block fun
        checkedMatchedBlock(allFlippedBlock[0],allFlippedBlock[1])
    }

}

function stopClicking()
{
    blockContainer.classList.add("noclick")

    setTimeout(()=>
    {
    blockContainer.classList.remove("noclick")
    }, duration)
}

function checkedMatchedBlock(firstBlock, seconedBlock)
{
    let tries = document.querySelector(".info .tries span")

    if(firstBlock.dataset.photo === seconedBlock.dataset.photo)
    {
        firstBlock.classList.remove("flipped")
        seconedBlock.classList.remove("flipped")
        
        firstBlock.classList.add("has-match")
        seconedBlock.classList.add("has-match")

        document.querySelector(".success").play();

        count++;

    } else
    {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("flipped")
            seconedBlock.classList.remove("flipped")
        }, duration)

        document.querySelector(".fail").play();
    }
    
    if(count === 10)
    {
        doneGame();
    }
}

function shuffle(arry)
{
    let current = arry.length;
    let temp;
    let random;

    while(current>0)
    {
        random = Math.floor(Math.random() * current);
        current--;
        temp = arry[current];
        arry[current] = arry[random];
        arry[random] = temp;
    }

    return arry;
}

function doneGame(){
    let div = document.createElement("div");
    let divText = document.createTextNode(`Congratulations.`);
    div.appendChild(divText)
    div.className = "popup"
    document.body.appendChild(div)
}
function endGame(){
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over.`);
    div.appendChild(divText)
    div.className = "popup"
    document.body.appendChild(div)
}