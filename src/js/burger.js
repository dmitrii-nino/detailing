const burger = document.querySelector('.header_burger');
const menu = document.querySelector('.header_menu');
const links = menu.querySelectorAll('a');
const servicesBtn = document.querySelector('.header_menu_services');
const servicesList = document.querySelector('.header_menu_services_list');

const preventScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

if(burger) {
    burger.addEventListener("click", () => {
        menu.classList.toggle('header_menu_opened')
    });

    menu.addEventListener('wheel', preventScroll, {passive: false});

    servicesBtn.addEventListener("click", () => {
        servicesList.classList.toggle('header_menu_services_list_opened');
        servicesBtn.classList.toggle('header_menu_services_choose')
    });

    Array.from(links).forEach(link => {
        link.addEventListener("click", () => {
            servicesList.classList.toggle('header_menu_services_list_opened')
            menu.classList.toggle('header_menu_opened')
        });
    })
}