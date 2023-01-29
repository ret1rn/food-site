let attr = document.querySelectorAll("button[data-modal]")
let modalWindow = document.querySelector(".modal")
let modalBack = document.querySelector(".container")
let close = document.querySelector(".modal__close")
let body = document.body
let images = document.querySelectorAll(".tabcontent")
let types = document.querySelectorAll("div[data-type]")
let next = document.querySelector(".offer__slider-next")
let prev = document.querySelector(".offer__slider-prev")
let slides = document.querySelectorAll(".offer__slide")
let total = document.querySelector("#total")
let current = document.querySelector("#current")
let count = 0
let chooseItem = document.querySelectorAll('.calculating__choose-item')
let chooseItem3 = document.querySelectorAll('.calculating__choose-item3')


function open() {
    modalWindow.style.display = "block"
    setTimeout(() => {
        modalBack.style.opacity = "0.7"
        modalWindow.style.opacity = "1"
    }, 200);
}

attr.forEach(btn => {
    btn.onclick = () => {
        open()
    }
})

close.onclick = () => {
    modalBack.style.opacity = "1"
    modalWindow.style.opacity = "0"
    setTimeout(() => {
        modalWindow.style.display = "none"
    }, 200);
}

body.onscroll = () => {
    if (Math.floor(window.innerHeight + window.scrollY >= body.offsetHeight - 1)) {
        open()
    }
    body.onscroll = ""
}

function changeImg(active) {
    images.forEach(img => {
        img.classList.add("hide")
    })
    types.forEach(type => {
        type.classList.remove("tabheader__item_active")
    })
    images[active].classList.remove("hide")
    images[active].classList.add("show", "fade")
    types[active].classList.add("tabheader__item_active")
}

changeImg(count)

types.forEach(type => {
    type.onclick = () => {
        changeImg(type.getAttribute("data-type"))
    }
})


total.innerHTML = slides.length

total.innerHTML.length == 1 ? total.innerHTML = "0" + slides.length : total.innerHTML = slides.length

function changeSlides(n) {
    slides.forEach(slide => {
        slide.classList.add("hide")
    })
    slides[n].classList.remove("hide")
    slides[n].classList.add("show", "fade")
    String(n).length == 1 && n <= 8 ? current.innerHTML = "0" + (n + 1) : current.innerHTML = n + 1
}

changeSlides(count)

next.onclick = () => {
    if (count >= slides.length - 1) {
        count = -1
    }
    count++
    changeSlides(count)
}

prev.onclick = () => {
    if (count < 1) {
        count = slides.length
    }
    count--
    changeSlides(count)
}

function selector(active) {
    active.forEach(item => {
        item.onclick = () => {
            active.forEach(item => {
                item.classList.remove("calculating__choose-item_active")
            })
            item.classList.add("calculating__choose-item_active")
        }
    })
}

selector(chooseItem)
selector(chooseItem3)

document.addEventListener('DOMContentLoaded', function () {
    // конечная дата
    const deadline = new Date(2023, 01, 11);
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
        $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
        $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
        $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    // получаем элементы, содержащие компоненты даты
    const $days = document.querySelector('#days');
    const $hours = document.querySelector('#hours');
    const $minutes = document.querySelector('#minutes');
    const $seconds = document.querySelector('#seconds');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
});