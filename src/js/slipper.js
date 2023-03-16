// Select all slides
const slippers = ['ceramica_ex_item', 'film_ex_item', 'drycleaning_ex_item', 'toning_ex_item', 'exterior_ex_item', 'polishing_ex_item', 'ceramic_title', 'film_title', 'drycleaning_title', 'toning_title', 'film_video_item', 'polishing_title']

const slides = {};
const slidesLabels = {};
const slidesFrames = {};

slippers.forEach(item => {
    if (document.querySelectorAll(`.slipper_item.${item}`).length > 0 ) {
        slides[item] = document.querySelectorAll(`.slipper_item.${item}`);
        slidesLabels[item] = document.querySelectorAll(`.slipper_controls_item.${item}`);
        slidesFrames[item] = document.querySelectorAll(`iframe.${item}`)
    }
});

// first state
Object.keys(slides).forEach((group) => {
    slides[group].forEach((slide, i) => {
        slide.style.transform = `translateX(${i * 100}%)`;
    });
});

// height style
const fixHeight = () => {
    const slipper = document.querySelector(`.slipper_item`);
    if (!slipper) return

    const width = slipper.clientWidth;
    const height = width / 16 * 9;

    document.querySelectorAll(`.slipper_item`).forEach(slide => slide.style.height = `${height}px`)
    document.querySelectorAll(`iframe`).forEach(frame => frame.style.height = `${height}px`)
    document.querySelectorAll(`.slipper`).forEach(container => {
        container.style.width = `${width}px`
        container.style.height = `${height}px`
    })
}

fixHeight();
window.addEventListener('resize', fixHeight);

const createListeners = (name) => {
    let curSlide = 0;
    const maxSlide = slides[name].length > 0 ? slides[name].length - 1 : 0;

    // labels style
    const changeLabels = (newId) => {
        slidesLabels[name].forEach(item => item.classList.remove('checked'))

        const label = document.getElementById(`control_${name}-${newId}`)
        label.classList.add('checked')
    }

    // stop video if slide changed
    const stopVideo = (currentSlide) => {
        slidesFrames[name].forEach(item => {
            if (item.id === `${name}-${currentSlide}`) {
                item.src = item.src
            }
        })
    }

    // steps
    const toNext = () => {
        if (curSlide === maxSlide) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        changeLabels(curSlide + 1)
        slides[name].forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
        });

        if (slidesFrames[name]) stopVideo(curSlide)
    };

    const toPrev = () => {
        if (curSlide === 0) {
            curSlide = maxSlide;
        } else {
            curSlide--;
        }

        changeLabels(curSlide + 1)
        slides[name].forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
        });

        if (slidesFrames[name]) stopVideo(curSlide)
    }

    const toCurrent = (newSlide) => {
        slides[name].forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - (newSlide - 1))}%)`;
        });

        changeLabels(newSlide)
    }

    // control by buttons
    const nextBtn = document.querySelector(`.slipper_arrow.right.${name}`);
    const prevBtn = document.querySelector(`.slipper_arrow.left.${name}`);
    nextBtn.addEventListener("click", toNext);
    prevBtn.addEventListener("click", toPrev);

    //  control by touch
    slides[name].forEach(slide => {
        let event,
            action;

        slide.addEventListener("click", () => null)

        slide.addEventListener("touchstart", (e) => event = e);

        slide.addEventListener("touchmove", (e) => {
            if (!event) return

            if ((e.touches[0].screenX - event.touches[0].screenX) < 0) action = 'next'
            if ((e.touches[0].screenX - event.touches[0].screenX) > 0) action = 'prev'
        });

        slide.addEventListener("touchend", () => {
            if (!slide.className.includes(name) || !action) return

            if (action === 'next') toNext()
            if (action === 'prev') toPrev()

            action = undefined
        });
    })

    // control be labels
    slidesLabels[name].forEach(label => {
        label.addEventListener("click", () => toCurrent(label.id.split('-')[1]));
    })
};

Object.keys(slides).forEach(item => createListeners(item))

// const frames = document.querySelectorAll('iframe');
// frames.forEach(frame => frame.style.height = `${frame.clientWidth / 16 * 9}px`)