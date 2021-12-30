const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let LastHole;
let timeUp = false;
let score = 0;


function RandomTime (min,max) {
    return Math.round( Math.random() * (max -min) + min)
}

function RandomHole(holes) {
    const idHole = Math.floor(Math.random() * holes.length);
    const hole = holes[idHole];
    if (LastHole === hole) {
        console.log("Se llama la funcion")
        return RandomHole(holes)
    }
    LastHole = hole;
    return hole;
}

function peep() {
    const time = RandomTime(200, 1000);
    const hole = RandomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
}


function bonk(e) {
    console.log(e.isTrusted)
    console.log(this.parentNode)
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }

  moles.forEach(mole => mole.addEventListener('click', bonk));

