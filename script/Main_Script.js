'use strict'

let ReactOnClick = false;
let audio = new Audio('audio/Song.mp3');

function Timer(block) {
    (ReactOnClick = !ReactOnClick) ? FerstClick(block) : SecondClick(block);
}

async function FerstClick(block){
    let EnterTime = prompt("На какое время запустить таймер?", 2) * 1000;

    let EndTime = Date.now() + EnterTime;
    
    await new Promise (resolve => {
        let Ping = setInterval( () => {
            let Passed = new Date(EndTime - Date.now());

            let RemainingMin = Math.round(Passed.getTime() / 60000)
            RemainingMin = (RemainingMin >= 10) ? `${RemainingMin}` : `0${RemainingMin}`;
            
            let RemainingSec = Math.round(Passed.getTime() / 1000)
            RemainingSec = (RemainingSec >=10) ? `${RemainingSec}` : `0${RemainingSec}`;

            block.innerHTML = `${RemainingMin}:${RemainingSec}`
        }, 1000)
        setTimeout( () => {resolve('done'), clearInterval(Ping)}, EnterTime)
    });
    
    audio.play();
    block.innerHTML = "Остановить";
}

function SecondClick(block) {
    block.innerHTML = "Запустить таймер"
    audio.pause();
    audio.currentTime = 0.0;
}