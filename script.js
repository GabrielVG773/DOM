const html = document.querySelector('html');
const btnFocus = document.querySelector('.app__card-button--foco');
const btnShort = document.querySelector('.app__card-button--curto');
const btnLong = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const btnBegin = document.querySelector('#start-pause');
const musicFocusInput = document.querySelector('#alternar-musica');
const btnStartPause = document.querySelector('#start-pause span');
const iconStartPause = document.querySelector('.app__card-primary-butto-icon');
const timer = document.querySelector('#timer');

const music = new Audio('./sounds/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sounds/play.wav');
const audioPause = new Audio('./sounds/pause.mp3');
const audioTimesUp = new Audio('./sounds/beep.mp3')



let elapsedTime = 1500;
let intervalId = null;

music.loop = true;

musicFocusInput.addEventListener('change', () => {
    if(music.paused) {
        music.play();
    } else {
        music.pause();
    }
});

btnFocus.addEventListener('click', () => {
    elapsedTime = 1500;
    alterarContexto('focus');
    btnFocus.classList.add('active');
});

btnShort.addEventListener('click', () => {
    elapsedTime = 300;
    alterarContexto('short-rest');
    btnShort.classList.add('active');
});

btnLong.addEventListener('click', () => {
    elapsedTime = 900;
    alterarContexto('long-rest');
    btnLong.classList.add('active');
});

function alterarContexto(contexto) {
    showTimer()
    buttons.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./images/${contexto}.png`);
    switch (contexto) {
        case "focus":
            titulo.innerHTML = `Improve your productivity,<br>
            <strong class="app__title-strong">dive on what really matter.</strong>`
        break;
        
        case "short-rest":
            titulo.innerHTML = `Take a breath! <strong class="app__title-strong">What about a short pause ?</strong>`
        break;

        case "long-rest":
            titulo.innerHTML = `Time to comeback to surface! <strong class="app__title-strong">Lets do a long pause!</strong>`
        break;

        default:
            break
    }
};

const contagemRegressiva = () => {
    if(elapsedTime <= 0){
        audioTimesUp.play()
        alert("Time's up!")
        zero();
        return
    }
    elapsedTime -= 1;
    showTimer();
}

btnBegin.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if(intervalId){
        audioPause.play();
        zero()
        return
    }
    audioPlay.play()
    intervalId = setInterval(contagemRegressiva, 1000);
    btnStartPause.textContent = "Pause";
    iconStartPause.setAttribute('src', './images/pause.png');
}

function zero() {
    clearInterval(intervalId)
    btnStartPause.textContent = "Start";
    iconStartPause.setAttribute('src', './images/play_arrow.png');
    intervalId = null;
}

function showTimer() {
    const tempo = new Date(elapsedTime * 1000);
    const formattedTime = tempo.toLocaleTimeString('eng', {minute: '2-digit', second:'2-digit'})
    timer.innerHTML = `${formattedTime}`;
}

showTimer();