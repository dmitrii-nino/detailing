const modals = document.querySelectorAll('.modal');
const tabs = document.querySelectorAll('.modal_tabs_item')
const types = ['full', 'gift'];

// modal windows can't be scrolled
modals.forEach(modal => {
    modal.addEventListener('wheel', (event) => event.preventDefault());
    modal.addEventListener('touchmove', (event) => event.preventDefault());
});

// close foo
const onClose = () => {
    modals.forEach(modal => modal.classList.add('hidden'))

    document.querySelectorAll('.modal_content')
        .forEach(slide => {
            if (!slide.classList.contains('min_phone_number')) slide.classList.add('hidden')
        })
    document.querySelectorAll(`.modal_content.car_model`).forEach(item => item.classList.remove('hidden'))

    tabs.forEach(tab => tab.classList.remove('checked'))
    types.forEach(type => document.getElementById(`tab-${type}-0`)?.classList.add('checked'));
}

// modal windows closes with data-value of close btn
const closeBtns = document.querySelectorAll('.modal_close');
closeBtns.forEach(btn => btn.addEventListener('click', onClose));

// close modals by click on blur
const blur = document.querySelector('.blur')
blur.addEventListener('click', onClose)

// modal form
const textInputs = document.querySelectorAll('.form_input');
const services = types.map(type => Array.from(document.querySelectorAll(`input[name="${type}_service"]`))).flat();
const carUsed = types.map(type => Array.from(document.querySelectorAll(`input[name="${type}_used_car"]`))).flat();
const gifts = types.map(type => Array.from(document.querySelectorAll(`input[name="${type}_gift"]`))).flat();
const userAgreements = document.querySelectorAll('input[value="agree"]');

// pre added value of service
window.onload = () => {
    services.forEach(item => {
        if (window.location.pathname === '/') return null
        if (item.value.includes(window.location.pathname
                    .replaceAll("/","")
                    .replaceAll(".html",""))) {

            item.checked = true;
            types.map(type => {
                const nextBtn = document.getElementById(`for_${type}_service`)
                nextBtn.classList.remove('disabled');
                nextBtn.disabled = false;
            });
        }
    })
}

const onInputChange = (input, valueLength) => {
    const btn = document.getElementById(`for_${input.id}`);
    const agreement = document.getElementById(`agree_${input.id}`);

    if (valueLength > 0 && (!agreement || agreement.checked)) {
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

    if (Array.from(arr).some(e => e.name === input.name && e.checked)) {
        btn.disabled = false
        btn.classList.remove('disabled')
    }
    else {
        btn.disabled = true
        btn.classList.add('disabled')
    }
}

userAgreements.forEach((agreement) => {
    agreement.addEventListener('change', (e) => {
        const current = document.getElementById(e.currentTarget.id.split('agree_')[1]);
        onInputChange(current, current.value.length)
    })
})

textInputs.forEach(input => input.addEventListener('keyup', (event) => onInputChange(input, event.currentTarget.value.length)))
textInputs.forEach(input => input.addEventListener('change', (event) => onInputChange(input, event.currentTarget.value.length)))
services.forEach(input => input.addEventListener('click', () => onSelectChange(services, input)))
carUsed.forEach(input => input.addEventListener('click', () => onSelectChange(carUsed, input)))
gifts.forEach(input => input.addEventListener('click', () => onSelectChange(gifts, input)))