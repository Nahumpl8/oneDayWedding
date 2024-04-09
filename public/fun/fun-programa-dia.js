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

for (let i = 1; i <= 1; i++) {
    const btnShowInfoDay = document.querySelector(`.btn-info-${i}`);
    const infoDay = document.querySelector(`.info-of-day-${i}`);
    const img = document.querySelector(`.img-${i}`);

    btnShowInfoDay.addEventListener('click', () => {
        infoDay.classList.toggle('show-information');
        if (infoDay.classList.contains('show-information')) {
            btnShowInfoDay.textContent = 'Ver menos -';
            img.style.filter = 'opacity(.5)';
        } else {
            btnShowInfoDay.textContent = 'Ver más +';
            img.style.filter = 'none';
        }
    });
}