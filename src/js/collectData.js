const modals = document.querySelectorAll('.modal');

// modal windows can't be scrolled
modals.forEach(modal => {
    modal.addEventListener('wheel', (event) => event.preventDefault());
    modal.addEventListener('touchmove', (event) => event.preventDefault());
});

// nav by tabs
const tabs = document.querySelectorAll('.modal_tabs_item')

// modal windows closes with data-value of close btn
const closeBtns = document.querySelectorAll('.modal_close');
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modals.forEach(modal => {
            if (modal.classList.contains(btn.dataset.value) || modal.classList.contains('blur')) modal.classList.add('hidden')
        })

        document.querySelectorAll('.modal_content')
            .forEach(slide => {
                if (!slide.classList.contains('min_phone_number')) slide.classList.add('hidden')
            })
        document.querySelector(`.modal_content.car_model`).classList.remove('hidden')

        tabs.forEach(tab => tab.classList.remove('checked'))
        document.getElementById(`tab-0`).classList.add('checked')

    })
});

// modal form
const textInputs = document.querySelectorAll('.form_input');
const services = document.querySelectorAll('input[name="service"]');
const carUsed = document.querySelectorAll('input[name="used_car"]');
const gifts = document.querySelectorAll('input[name="gift"]');

    // pre added value of service
    window.onload = () => {
        services.forEach(item => {
            if (window.location.pathname === '/') return null
            if (item.value.includes( window.location.pathname.replaceAll("/","").replaceAll(".html",""))) item.checked = true
        })
    }

const onInputChange = (input, event) => {
    const btn = document.getElementById(`for_${input.id}`);

    if (event.currentTarget.value.length > 0) {
        btn.disabled = false
        btn.classList.remove('disabled')
    }
    else {
        btn.disabled = true
        btn.classList.add('disabled')
    }
}

const onSelectChange = (arr, input) => {
    const btn = document.getElementById(`for_${input.name}`);

    if (Array.from(arr).some(input => input.checked)) {
        btn.disabled = false
        btn.classList.remove('disabled')
    }
    else {
        btn.disabled = true
        btn.classList.add('disabled')
    }
}

textInputs.forEach(input => input.addEventListener('change', (event) => onInputChange(input, event)))
services.forEach(input => input.addEventListener('click', () => onSelectChange(services, input)))
carUsed.forEach(input => input.addEventListener('click', () => onSelectChange(carUsed, input)))
gifts.forEach(input => input.addEventListener('click', () => onSelectChange(gifts, input)))