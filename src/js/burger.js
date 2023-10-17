const burger = document.querySelector('.header_burger');
const menu = document.querySelector('.header_menu');
const links = menu.querySelectorAll('a');
const servicesBtn = document.querySelector('.header_menu_services');
const servicesList = document.querySelector('.header_menu_services_list');
const servicesItems = servicesList.querySelectorAll('.header_menu_services_item');
const servicesSublists = servicesList.querySelectorAll('.header_menu_services_sublist');
const servicesSubItems = servicesList.querySelectorAll('.header_menu_services_item_subitem');
const servicesSubSublists = servicesList.querySelectorAll('.header_menu_services_sublist_subsublist');

const preventScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

const closeSublist = () => {
    Array.from(servicesSublists).forEach(sublist =>
        sublist.classList.remove('header_menu_services_sublist_opened')
    );
    Array.from(servicesItems).forEach(subtitle => subtitle.classList.remove('header_menu_services_item_choose'));
}

if (burger) {
    burger.addEventListener("click", () => {
        menu.classList.toggle('header_menu_opened')
    });

    menu.addEventListener('wheel', preventScroll, { passive: false });

    servicesBtn.addEventListener("click", () => {
        closeSublist();
        servicesList.classList.toggle('header_menu_services_list_opened');
        servicesBtn.classList.toggle('header_menu_services_choose')
    });

    Array.from(servicesItems).forEach(subtitle => {
        subtitle.addEventListener('click', () => {
            if (!subtitle.classList.contains('header_menu_services_item_choose')) closeSublist();
            subtitle.classList.toggle('header_menu_services_item_choose');
            subtitle.nextSibling.nextSibling.classList.toggle('header_menu_services_sublist_opened');
        })
    })

    Array.from(links).forEach(link => {
        link.addEventListener("click", () => {
            servicesList.classList.toggle('header_menu_services_list_opened')
            menu.classList.toggle('header_menu_opened')
        });
    })
}