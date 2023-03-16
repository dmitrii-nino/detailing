const sliders = ['ceramica_ex_item', 'film_ex_item', 'drycleaning_ex_item', 'toning_ex_item', 'exterior_ex_item', 'polishing_ex_item',
                    'ceramic_title', 'film_title', 'drycleaning_title', 'toning_title',
                    'film_video_item', 'polishing_title']

const slides = {};
const slidesControls = {};
const slidesLabels = {};
const slidesArrows = {};

// const slidesFrames = {};

sliders.forEach(item => {
    slides[item] = document.querySelectorAll(`.slider_item.${item}`);
    slidesControls[item] = document.querySelectorAll(`.slider_input.${item}`);
    slidesLabels[item] = document.querySelectorAll(`.slider_controls_item.${item}`);
    slidesArrows[item] = document.querySelectorAll(`.slider_arrow.${item}`);

    // slidesFrames[item] = document.querySelectorAll(`.frame.${item}`)
});

const createListeners = (name) => {
    // управление по кадрам
    const labels = slidesLabels[name];
    const changeLabels = (newId) => {
        labels.forEach(item => item.classList.remove('checked'))

        const label = document.getElementById(`control_${name}-${newId}`)
        label.classList.add('checked')
    }
    labels.forEach(item => {
        item.addEventListener('click', () => changeLabels(item.id.split('-')[1]))
    })

    // // если в слайдере видос - переназначаем сурс для остановки видео
    // const stopVideo = (currentSlide) => {
    //     slidesFrames[name].forEach(item => {
    //         if (item.id === `${name}-${currentSlide}`) {
    //             item.src = item.src
    //         }
    //     })
    // }

    // событие prev
    const goPrev = (currentSlide) => {
        if (currentSlide === 1) {
            slidesControls[name].forEach(control => {
                if (control.id === `${name}-${slides[name].length}`) {
                    changeLabels(slides[name].length);
                    control.checked = true
                }
            })
        } else {
            slidesControls[name].forEach(control => {
                if (control.id === `${name}-${currentSlide - 1}`) {
                    changeLabels(1);
                    control.checked = true
                }
            })
        }

        // if (slidesFrames[name]) stopVideo(currentSlide)
    }

    // событие next
    const goNext = (currentSlide) => {
        if (slides[name].length === currentSlide) {
            slidesControls[name].forEach(control => {
                if (control.id === `${name}-1`) {
                    changeLabels(1);
                    control.checked = true
                }
            })
        } else {
            slidesControls[name].forEach(control => {
                if (control.id === `${name}-${currentSlide + 1}`) {
                    changeLabels(currentSlide + 1)
                    control.checked = true
                }
            })
        }

        // if (slidesFrames[name]) stopVideo(currentSlide)
    }

    // стрелки управления
    const arrows = slidesArrows[name];
    arrows.forEach(item => {
        if (item.className.includes('left')) {
            item.addEventListener('click', () => {
                let currentSlide;
                slidesControls[name].forEach(control => {
                    if (control.checked) currentSlide = control.id.split('-')[1]
                })

                goPrev(Number(currentSlide))
            })
        }
        else {
            item.addEventListener('click', () => {
                let currentSlide;
                slidesControls[name].forEach(control => {
                    if (control.checked) currentSlide = control.id.split('-')[1]
                })

                goNext(Number(currentSlide))
            })
        }
    })

    // непосредственно слайды
    slides[name].forEach(slide => {
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

                if (action === 'next') goNext(currentSlide)
                if (action === 'prev') goPrev(currentSlide)
            });

    })
};

Object.keys(slides).forEach(item => createListeners(item))
