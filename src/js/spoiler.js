const spoilers = document.querySelectorAll('.spoiler_header');

const onOpen = (item) => {
    Array.from(item.children).forEach(child => {
        if (child.classList.contains('plus') || child.classList.contains('minus')) {
            child.classList.toggle('hidden')
        }
    })
    item.nextElementSibling.classList.toggle('hidden');
};

spoilers.forEach(header => {
    header.addEventListener('click', () => onOpen(header))
});