const burger = document.querySelector('.header_burger');
const menu = document.querySelector('.header_menu');
const links = menu.querySelectorAll('a');
const servicesBtn = document.querySelector('.header_menu_services');
const servicesList = document.querySelector('.header_menu_services_list');
const servicesItems = servicesList.querySelectorAll('.header_menu_services_item');
const servicesSublists = servicesList.querySelectorAll('.header_menu_services_sublist');
const container =  document.querySelector('.container');

const servicesSublistsItems = servicesList.querySelectorAll('.header_menu_services_sublist_item');
const servicesSubSublist = servicesList.querySelectorAll('.header_menu_services_sublist_sublist');

const closeSubSublist = () => {
    Array.from(servicesSubSublist).forEach(sublist =>
        sublist.classList.remove('header_menu_services_sublist_opened')
    );
    Array.from(servicesSublistsItems).forEach(subtitle => subtitle.classList.remove('header_menu_services_item_choose'));
}

const closeSublist = () => {
    Array.from(servicesSublists).forEach(sublist =>
        sublist.classList.remove('header_menu_services_sublist_opened')
    );
    Array.from(servicesItems).forEach(subtitle => subtitle.classList.remove('header_menu_services_item_choose'));
}

const closeList = ({mobile}) => {
    servicesList.classList.remove('header_menu_services_list_opened');
    servicesBtn.classList.remove('header_menu_services_choose');
    if (mobile) {
        menu.classList.remove('header_menu_opened');
        container.classList.remove('container_hidden');
        Array.from(container.children).forEach(child => child.classList.remove('invisible'));
    }
}


const openList = ({ mobile }) => {
  servicesList.classList.add('header_menu_services_list_opened');
  servicesBtn.classList.add('header_menu_services_choose');

  if (mobile) {
    menu.classList.add('header_menu_opened');

    const header = container.firstElementChild;
    setTimeout(() => {
        if (!menu.classList.contains('header_menu_opened')) return
        Array.from(container.children).forEach(child => {
            if (child !== header) {
                child.classList.add('invisible');
            }
        });
    }, 420)
  }
};


if (burger) {
    burger.addEventListener("click", () => {
        if (menu.classList.contains('header_menu_opened')) {
            closeSublist();
            closeList({mobile: true});
            return
        }
       openList({mobile: true});
    });

    servicesBtn.addEventListener("click", () => {
        if (servicesList.classList.contains('header_menu_services_list_opened')) {
            closeSublist();
            closeList({mobile: false});
            return
        }
        openList({mobile :false});
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1239) {
            Array.from(container.children).forEach(child => child.classList.remove('invisible'));
        }
    })

    Array.from(servicesItems).forEach(subtitle => {
        subtitle.addEventListener('click', () => {
            if (!subtitle.classList.contains('header_menu_services_item_choose')) {
                closeSubSublist();
                closeSublist();
            }
            subtitle.classList.toggle('header_menu_services_item_choose');
            subtitle.nextSibling.nextSibling.classList.toggle('header_menu_services_sublist_opened');
        })
    })

    Array.from(servicesSublistsItems).forEach(sublist => {
        sublist.addEventListener('click', () => {
            sublist.classList.toggle('header_menu_services_sublist_item_choose');
            sublist.nextSibling.nextSibling.classList.toggle('header_menu_services_sublist_sublist_opened');
        })
    })

    Array.from(links).forEach(link => {
        link.addEventListener("click", () => {
            closeSubSublist();
            closeSublist();
            closeList();
        });
    })

}