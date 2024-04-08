//slider_home
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
            if (i == index) {
                slide.style.display = 'flex';
            } else {
                slide.style.display = 'none';
            }
        });
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}
showSlide(currentSlide);

setInterval(nextSlide, 4000);

const weddingDate = new Date("October 19, 2024 21:00:00").getTime();


function updateTimer() {
    const currentDate = new Date().getTime();
    const timeDifference = weddingDate - currentDate;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if(days == 1){
        document.querySelector('.days').innerHTML= `<span style="font-size:10rem; font-family: 'titlesWedding', sans-serif; font-weight:500; margin-bottom:-20px;">${days}</span> <br> <span style="font-family: Outfit, sans-serif;">día/<span>`;
    } else{
        document.querySelector('.days').innerHTML= `<span class="number_time">${days}</span> <br> <span style="font-family: Outfit, sans-serif;">días</span>`;
    }
    if(hours == 1){
        document.querySelector('.hours').innerHTML= `<span class="number_time">${hours}</span> <br> <span style="font-family: Outfit, sans-serif;">hora</span>`;
    } else{
        document.querySelector('.hours').innerHTML= `<span class="number_time">${hours}</span> <br> <span style="font-family: Outfit, sans-serif;">horas</span>`;
    }
    if(minutes == 1){
        document.querySelector('.minutes').innerHTML= `<span class="number_time">${minutes}</span> <br> <span style="font-family: Outfit, sans-serif;">minuto</span>`;
    } else{
        document.querySelector('.minutes').innerHTML= `<span class="number_time">${minutes}</span> <br> <span style="font-family: Outfit, sans-serif;">minutos</span>`;
    }
    if(seconds == 1){
        document.querySelector('.seconds').innerHTML= `<span class="number_time">${seconds}</span> <br> <span style="font-family: Outfit, sans-serif;">segundo</span>`;
    } else{
        document.querySelector('.seconds').innerHTML= `<span class="number_time">${seconds}</span> <br> <span style="font-family: Outfit, sans-serif;">segundos</span>`;
    }
    
}

updateTimer();

setInterval(updateTimer, 1000);


const showTime = document.querySelectorAll('.time div');

window.addEventListener('scroll', checkScroll)

function checkScroll(){
    showTime.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.9; 

        if (boxTop < triggerBottom) {
            box.classList.add('show');
        } else {
            box.classList.remove('show');
        }
    });
}

const detailsBox = document.querySelectorAll('.info_wedding')

window.addEventListener('scroll', checkScrollDetails)

function checkScrollDetails(){
    detailsBox.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.9; 

        if (boxTop < triggerBottom) {
            box.classList.add('show');
        } else {
            box.classList.remove('show');
        }
    });
}


const menuOptions = document.querySelector('.menu_p img')
const navBar = document.querySelector('.navbar')
const menuIcon = document.querySelector('.menu_icon')
const logoW = document.querySelector('.principal_logo')

menuOptions.addEventListener('click', toggleMobileMenu)
function toggleMobileMenu() {
    const navPhoneMenu = document.querySelector('.nav_phone_menu');
    navPhoneMenu.classList.toggle('show');
    navBar.classList.toggle('show')


    if(menuIcon.src.includes('ListGold.png')){
        menuIcon.src = '/images/XGold.png';
    } else{
        menuIcon.src = '/images/ListGold.png'
    }
}

const phoneOptions = document.querySelectorAll('.nav_phone_menu a')

phoneOptions.forEach((op) => {
    op.addEventListener('click', toggleMobileMenu)
})


const menuDesktop = document.querySelector('.desktop_menu');
const menuDesktopOp = document.querySelectorAll('.desktop_menu a')
const logoWDesktop = document.querySelector('.principal_logo_desktop')
const phoneBar = document.querySelector('.phone_menu')

document.addEventListener('scroll', () => {
    if(window.scrollY > 600){
        phoneBar.classList.add('phone_scroll')
        menuDesktop.classList.add('desktop_scroll')
        logoWDesktop.src = '/images/goldLogo.png';
    } else{
        phoneBar.classList.remove('phone_scroll')
        menuDesktop.classList.remove('desktop_scroll')
        logoWDesktop.src = '/images/wedding.png';
    }
    
})


//TICKER
const contenedor = document.querySelector(".ticker-title");
const items = document.querySelectorAll(".ticker-title span");
let ancho = 0;
items.forEach( item => ancho += (item.clientWidth + 50));
contenedor.style.width = ancho + "px";

let left = 0;
setInterval(()=>{
    if((left * -1) < (contenedor.children[0].clientWidth + 50)){
        left--;
    }else{
        contenedor.appendChild(contenedor.children[0]);
        left = 0;
    }
    contenedor.style.left = left + "px";

},1000/60);


