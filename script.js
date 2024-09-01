// constants and varibales
let inputDir={x:0,y:0};
const foodSound=new Audio("/snake game/asset/food.mp3");
const gameOverSound=new Audio("/snake game/asset/gameover.mp3");
const move=new Audio("/snake game/asset/move.mp3");
const music=new Audio("/snake game/asset/music.mp3");
// const board=document.querySelector("#board");

let speed=5;
let lastPaintTime=0;
let score=0;
// let highVal=0;

let snakeArray=[
    {x:13 ,y:15}
]

food={x:6 ,y:5};

// HERE we write the main function
function main(ctime){//this function is an game loop 
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    else{
        lastPaintTime=ctime;
    }
    gameEngine();
}

// this function check the snake collide to self or any border
function isCollide(array){
 // if you dump into yourself
 for(let i=1;i<snakeArray.length;i++){
    if(snakeArray[0].x===array[i].x && snakeArray[0].y===array[i].y){
        return true;
    }
 } 
 // and snake is dunp in itself
 if(array[0].x>=18 ||array[0].x<=0 || array[0].y>=18 ||array[0].y<=0){
    return true;
 }
}



function gameEngine(){// this function called by main function to execute each and every operation
if(isCollide(snakeArray)){
    gameOverSound.play();
    music.pause();
    inputDir={x:0,y:0};
    alert("game over ,press ok to continue");
    music.play();
    snakeArray=[{x:13 ,y:15}];
    music.play();
    score=0;
}


// here we write a function for regaenertae the food
if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
    //here we incress the size of snake towards their moving side
    foodSound.play();
    score+=1;

    // if(highScore<score){
    //     highVal=score;
    //     localStorage.setItem("highScore",JSON.stringify(highVal));
    //     HighScore.innerHTML="High score:"+highVal;
    // }
    scoreBoard.innerHTML="score:"+score;
    snakeArray.unshift({x:snakeArray[0].x + inputDir.x , y:snakeArray[0].y + inputDir.y});

    // here we genertae random food location
    let a=2;
    let b=15;
    food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
    
} 

// here we write a logic for moving a snake
for(let i= snakeArray.length-2 ;i>=0 ;i--){
    // const element=snakeArray[i];
    snakeArray[i+1]={...snakeArray[i]};
}
snakeArray[0].x+=inputDir.x;
snakeArray[0].y+=inputDir.y;



// add sanke
board.innerHTML="";
snakeArray.forEach((e,index)=>{
    snakeElement=document.createElement('div');
    snakeElement.style.gridRowStart=e.y;// style.gridRowStart are bulit in property to position a element on css grid
    snakeElement.style.gridColumnStart=e.x;
    if(index === 0){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
})
// add  food element on random grid location
foodElement=document.createElement('div');
foodElement.style.gridRowStart=food.y;
foodElement.style.gridColumnStart=food.x;
foodElement.classList.add('food');
board.appendChild(foodElement);
}



//main logic started from here

// here we get teh high score of game
// let highScore=localStorage.getItem("highScore")
// if(highScore === null){
//     highVal=0;
//     localStorage.setItem("highScore",JSON.stringify(highVal));
// }
// else{
//     highVal= JSON.parse(highScore);
//     HighScore.innerHTML="High score:"+highVal;
// }

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0 ,y:1};
    move.play();
    switch(e.key){
        case"ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case"ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
         case"ArrowLeft":
         inputDir.x=-1;
         inputDir.y=0;
            break;
         case"ArrowRight":
         inputDir.x=1;
         inputDir.y=0;
            break;
    }
    

})
