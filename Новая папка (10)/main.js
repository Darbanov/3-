let form = document.querySelector('.form');
let name = document.getElementById('name');
let number = document.getElementById('number');
let date = document.getElementById('date');
let cvv = document.getElementById('cvv');

let visa = document.querySelector('.card');


function showError(element, error) {
    if(error === true) {
        element.style.opacity = '1';
    } else {
        element.style.opacity = '0';
    }
};


name.addEventListener('input', function() {
    let alert1 = document.getElementById('alert-1');
    let error = this.value === '';
    showError(alert1, error);
    document.getElementById('card-name').textContent = this.value;
});


number.addEventListener('input', function(e) {
    this.value = numberAutoFormat();


    let error = this.value.length !== 19;
    let alert2 = document.getElementById('alert-2');
    showError(alert2, error);

    document.querySelector('.card__number').textContent = this.value;
});

function numberAutoFormat() {
    let valueNumber = number.value;

    let v = valueNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];

    for (i = 0; i < match.length; i += 4) {

        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {

        return parts.join(' ');
    } else {
        return valueNumber;
    }
};


date.addEventListener('input', function(e) {
    this.value = dateAutoFormat();
    

    let alert3 = document.getElementById('alert-3');
    showError(alert3, isNotDate(this));

    let dateNumber = date.value.match(/\d{2,4}/g);
    document.getElementById('month').textContent = dateNumber[0];
    document.getElementById('year').textContent = dateNumber[1];
});

function isNotDate(element) {
    let actualDate = new Date();
    let month = actualDate.getMonth() + 1;
    let year = Number(actualDate.getFullYear().toString().substr(-2));
    let dateNumber = element.value.match(/\d{2,4}/g);
    let monthNumber = Number(dateNumber[0]);
    let yearNumber = Number(dateNumber[1]);
    
    if(element.value === '' || monthNumber < 1 || monthNumber > 12 || yearNumber < year || (monthNumber <= month && yearNumber === year)) {
        return true;
    } else {
        return false;
    }
}

function dateAutoFormat() {
    let dateValue = date.value;

    let v = dateValue.replace(/\s+/g, '').replace(/[^0-9]/gi, '');


    let matches = v.match(/\d{2,4}/g);
    let match = matches && matches[0] || '';
    let parts = [];

    for (i = 0; i < match.length; i += 2) {

        parts.push(match.substring(i, i + 2));
    }

    if (parts.length) {
        return parts.join('/');
    } else {
        return dateValue;
    }
};


cvv.addEventListener('input', function(e) {
    let alert4 = document.getElementById('alert-4');
    let error = this.value.length < 3;
    showError(alert4, error)
});


function isNumeric(event) {
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode > 31)) {
        return false;
    }
};

/*  VALIDATION FORM WHEN PRESS THE BUTTON   */
form.addEventListener('submit', function (e) {
    // 1. if there is not any name
    // 2. if the length of the number card is not valid (16 numbers and 3 white space)
    // 3. if is not a valid date (4 number and "/" or is not a valid date)
    // 4. if is not a valid cvv

    if(name.value === '' || number.value.length !== 19 || date.value.length !== 5 || isNotDate(date) === true || cvv.value.length < 3) {
        e.preventDefault();
    };

    // 5. if any input is empty show the alert of that input
    let input = document.querySelectorAll('input');
    for( i = 0; i < input.length; i++) {
        if(input[i].value === '') {
            input[i].nextElementSibling.style.opacity = '1';
        }
    }
});