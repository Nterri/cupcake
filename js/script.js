$(document).ready(function () {
    $('.slider').slick({
        slidesToShow: 3,
        waitForAnimate: false,
        autoplay: true,
        centerMode: true,
        variableWidth: true,
    });
});

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header__container').offsetHeight;
            if (iconMenu.classList.contains('active')) {
                document.body.classList.remove('lock');
                iconMenu.classList.remove('active');
                menuBody.classList.remove('active');
            }
            console.log(gotoBlockValue);
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
    }
};

const number = document.querySelector('.number');
const errorPhone = document.querySelector('.submit__error-phone');
const checkbox = document.querySelector('.checkbox-input');
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('subscribe_form');
    form.addEventListener('submit', formSend);
    function formSend(e) {
        e.preventDefault();
        if (errorPhone.classList.contains('active')) { errorPhone.classList.remove('active'); }
        if (number.classList.contains('error')) { number.classList.remove('error'); }
        if (checkbox.classList.contains('error')) { checkbox.classList.remove('error'); }
        if (number.value == '') {
            number.classList.add('error');
            errorPhone.classList.add('active');
        }
        if (!numberTest(number) && number.value != '') {
            number.classList.add('error');
            if (!errorPhone.classList.contains('active')) { errorPhone.classList.add('active') };
        }
        if (checkbox.checked === false) { checkbox.classList.add('error') }
        if (numberTest(number) && number.value != '' && checkbox.checked === true) {
            form.reset();
            form.classList.add('well');
            /* let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('sending');
            } else {
                alert('Error');
                form.classList.remove('sending');
            } */
            setTimeout(() => {
                form.classList.remove('well');
            }, 2000);
        }
    }
    function numberTest(input) {
        return /^\d[\d\(\)\ -]{4,14}\d$/.test(number.value);
    };
});