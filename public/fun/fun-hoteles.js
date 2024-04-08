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
        menuIcon.src = '/images/XGold.png'
        logoW.src = '/images/goldLogo.png'
    } else{
        menuIcon.src = '/images/ListGold.png'
        logoW.src = '/images/goldLogo.png'
    }

}

const menuDesktop = document.querySelector('.desktop_menu');
const menuDesktopOp = document.querySelectorAll('.desktop_menu a')
const logoWDesktop = document.querySelector('.principal_logo_desktop')
const phoneBar = document.querySelector('.phone_menu')

document.addEventListener('scroll', () => {
    if(window.scrollY > 200){
        phoneBar.classList.add('phone_scroll')
        menuDesktop.classList.add('desktop_scroll')
        logoWDesktop.src = '/images/goldLogo.png';
        logoW.src = '/images/goldLogo.png'

    } else{
        phoneBar.classList.remove('phone_scroll')
        menuDesktop.classList.remove('desktop_scroll')
        logoWDesktop.src = '/images/wedding.png';
    }
    
})

const cardHotels = document.querySelectorAll('.card_hotel');

window.addEventListener('load', checkScroll)
window.addEventListener('scroll', checkScroll)
window.addEventListener('resize', checkScroll)


function checkScroll(){
    cardHotels.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.9; 

        if (boxTop < triggerBottom) {
            box.classList.add('show');
        } else {
            box.classList.remove('show');
        }
    });
}

const phoneOptions = document.querySelectorAll('.nav_phone_menu a')

phoneOptions.forEach((op) => {
    op.addEventListener('click', toggleMobileMenu)
})