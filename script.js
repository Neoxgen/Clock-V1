const hours = document.querySelector('.hour')
const minutes = document.querySelector('.minute')
const seconds = document.querySelector('.second')
const themeToggler = document.getElementById('theme-toggler');
const circle = document.querySelector('.circle')


/*---Animation Jour/Nuit---*/ 

themeToggler.addEventListener('click', () => {
    const html = document.querySelector('html')
    themeToggler.classList.toggle('fa-sun')
    if(themeToggler.classList.contains('fa-sun')){
        html.classList.remove('dark');
    }else{
        html.classList.add('dark');
    }
})

/*---Fonctionnement horloge---*/

function clock() {
    let time = new Date();
    let hr = (time.getHours() % 12) + time.getMinutes() / 60;
    let min = time.getMinutes() + time.getSeconds() / 60
    let sd =  time.getSeconds() 

    hr *= 30; 
    min *= 6;
    sd *= 6; 

    rotation(hours, hr);
    rotation(minutes, min);
    rotation(seconds, sd);

    setTimeout(clock, 500);
}

rotation = (target, val) => {
    target.style.transform =  `rotate(${val}deg)`;
    
} 

window.onload = clock();

/*---Création de 60 div (60 * 6deg = 360deg)---*/
/*---design des minutes et des secondes---*/ 

function createBar() {

    for(let i = 0; i < 360; i += 6) {
        const rotation = document.createElement('div')
        const border = document.createElement('div')
        rotation.classList.add('rotor-ball')
        border.classList.add('rotor1')
        rotation.style.transform = `rotate(${i}deg)`
        border.style.transform = `rotate(${i + 3}deg)`
        circle.appendChild(rotation)
        circle.appendChild(border)
        rotation.insertAdjacentHTML('afterbegin','<div class="bar"></div>')
        border.insertAdjacentHTML('afterbegin', '<div class="border"></div>')
    }
}

createBar ()

/*---Création de 12 div (12 * 30deg = 360deg)---*/
/*---design des chiffres et des chiffres romains---*/

function createRedBar () {

    for(let j = 0; j < 360; j += 30) {
        const rotation = document.createElement('div')
        const number = document.createElement('div')
        rotation.classList.add('rotor-ball')
        number.classList.add('rotor1')
        rotation.style.transform = `rotate(${j}deg)`
        number.style.transform = `rotate(${j}deg)`
        circle.appendChild(rotation)
        circle.appendChild(number)
        rotation.insertAdjacentHTML('afterbegin','<div class="numX"></div>')
        number.insertAdjacentHTML('afterbegin', '<div class="num"></div>')
    }
}

createRedBar()

/*---Affichage et orientation des chiffres (n) et (x) ---*/
/*---Mise à l'endroit du chiffre "VI" (idx == 6)---*/

const numberNum = document.querySelectorAll('.num')
const numberNumX = document.querySelectorAll('.numX')
const X = ['XII','|','|','III','|','|','VI','|','|','IX','|','|']
const n = [60,5,10,15,20,25,30,35,40,45,50,55];
const rN = [0,30,60,90,120,150,180,210,240,270,300,330,360]

function writeNumber () {

    numberNum.forEach((num,idx) => {
        num.textContent = n[idx];
        num.style.transform = `rotate(${-rN[idx]}deg)`
        })
    numberNumX.forEach((numX,idx) => {
            numX.textContent = X[idx];
            if((numX,(idx==6)) === true) {
                numX.style.transform = 'rotate(180deg)'
            }
        })
}

writeNumber()