const sliders = ['ceramica_ex_item', 'film_ex_item', 'drycleaning_ex_item', 'toning_ex_item']

const slides = {};
const slidesControls = {};
const slidesLabels = {};

sliders.forEach(item => {
    slides[item] = document.querySelectorAll(`.slider_item.${item}`);
    slidesControls[item] = document.querySelectorAll(`.slider_input.${item}`);
    slidesLabels[item] = document.querySelectorAll(`.slider_controls_item.${item}`);
});

const createListeners = (slides, controls, name) => {

    const labels = slidesLabels[name];
    const changeLabels = (newId) => {
        labels.forEach(item => item.classList.remove('checked'))

        const label = document.getElementById(`control_${name}-${newId}`)
        label.classList.add('checked')
    }

    labels.forEach(item => {
        item.addEventListener('click', () => changeLabels(item.id.split('-')[1]))
    })

    slides.forEach(slide => {
            let event,
                action;

            slide.addEventListener("touchstart", (e) => event = e);

            slide.addEventListener("touchmove", (e) => {
                if (!event) return

                if ((e.touches[0].screenX - event.touches[0].screenX) < 0) action = 'next'
                if ((e.touches[0].screenX - event.touches[0].screenX) > 0) action = 'prev'
            });

            slide.addEventListener("touchend", () => {
                if (!slide.className.includes(name) || !action) return

                const currentSlide = Number(slide.dataset['value']);

                if (action === 'next') {
                    if (slides.length === currentSlide) {
                        controls.forEach(control => {
                            if (control.id === `${name}-1`) {
                                changeLabels(1);
                                control.checked = true
                            }
                        })
                    } else {
                        controls.forEach(control => {
                            if (control.id === `${name}-${currentSlide + 1}`) {
                                changeLabels(currentSlide + 1)
                                control.checked = true
                            }
                        })
                    }
                }

                if (action === 'prev') {
                    if (currentSlide === 1) {
                        controls.forEach(control => {
                            if (control.id === `${name}-${slides.length}`) {
                                changeLabels(slides.length);
                                control.checked = true
                            }
                        })
                    } else {
                        controls.forEach(control => {
                            if (control.id === `${name}-${currentSlide - 1}`) {
                                changeLabels(1);
                                control.checked = true
                            }
                        })
                    }
                }
            });

    })
};

Object.keys(slides).forEach(item => createListeners(slides[item], slidesControls[item], item))
