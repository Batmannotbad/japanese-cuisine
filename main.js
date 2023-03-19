const navbar = document.querySelector('.navbar-list');
const navbarLinks = document.querySelectorAll('.navbar-link');
const backToTop = document.querySelector('.back-to-top');
const phone = document.getElementById('phone');
const firstname = document.getElementById('name');
const surname = document.getElementById('surname');
const number = document.getElementById('number');
const email = document.getElementById('email');
const day = document.getElementById('day');
const time = document.getElementById('time');
const form = document.querySelector('form');

//toggle navbar
document.querySelector('#menu-toggle').addEventListener('change', showNavbar)

function showNavbar() {
    navbar.classList.toggle('active')
}

navbarLinks.forEach(function(link) {
    link.onclick = () => {
        navbar.classList.remove('active')
    } 
})

//back to top sticky

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});

//booking form validation
function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')
    input.classList.add('error')
    small.innerText = message
}

function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')
    input.classList.remove('error')
    small.innerText = ''
}

function checkEmptyError(listInput) {
    let isEmptyError = false;
    listInput.forEach(
        function (input) {
        input.value = input.value.trim()

        if (!input.value) {
            isEmptyError = true;
            showError(input, 'This is a required field')
        }else{
            showSuccess(input)
        }
    });

    return isEmptyError
} 

function checkEmail(input) {

    const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    input.value = input.value.trim()

    let isEmailError = !regexEmail.test(input.value)

    if(regexEmail.test(input.value)) {
        showSuccess(input)
    }else{
        showError(input, 'Invalid Email')
    }

    return isEmailError
}

function checkNumber(input, min, max) {
    var convertNumber = Number(input.value)
    
    let isNumerError = false;

    if (convertNumber >= max || convertNumber <= min) {
        isNumerError = true;
        showError(input, 'Invalid number of guests')
    }else{
        showSuccess(input)
    }

    return isNumerError
}

function checkPhoneNUmber(input) {

    let isPhoneError = false;

    var regexPhone = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

    if((input.value.match(regexPhone))) {
        showSuccess(input)
    }else{
        showError(input, 'Invalid phone number')
        isPhoneError = true;
    }

    return isPhoneError
}

function checkDay(input) {
    let isDayError = false;

    console.log(input.value)

    if( input.value == 'day-select') {
        isDayError = true;
        showError(input, 'Invalid day')
    }else{
        showSuccess(input)
    }
}

form.addEventListener('submit', function(e){
    e.preventDefault()

    let isEmptyError = checkEmptyError([firstname, surname, phone, email, number, day, time])

    let isEmailError = checkEmail(email)

    let isNumerError = checkNumber(number, 0, 10)

    let isPhoneError = checkPhoneNUmber(phone)

    let isDayError = checkDay(day)

    if (isEmptyError || isEmailError || isNumerError || isPhoneError || isDayError) {

    }else{
        saveFormData()
        alert('Reservation Successful');
    }
})
