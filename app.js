
// Get input elements and buttons
const inputName = document.getElementById('name');
const inputCount = document.getElementById('count');
const inputMonth = document.getElementById('expiry-month');
const inputYear = document.getElementById('expiry-year');
const inputCvc = document.getElementById('cvc');
const btn1 = document.querySelector('.confirm-card .btn');
const btn2 = document.querySelector('.complete .btn');
const confirmCard = document.querySelector('.confirm-card');
const completeCard = document.querySelector('.complete');
const countDisplay = document.querySelector('.expiry-count-display');
const nameDisplay = document.querySelector('.name-display');
const monthDisplay = document.querySelector('.month-display');
const yearDisplay = document.querySelector('.year-display');
const cvcDisplay = document.querySelector('cvc-display');
const error = document.querySelectorAll('.error');

// Add event listener to the "Confirm" button
btn1.addEventListener('click', validate);



const errorArray = Array.from(error); // Convert the NodeList to an Array

// Function to check if the inputs are empty or not
function isEmpty() {
  const inputs = [inputName, inputCount, inputMonth, inputYear, inputCvc];
  let isValid = true;

  inputs.forEach((input, index) => {
    const errorElement = errorArray[index];
    if (input.value === '') {
      showError(input,`Can't be blank`, index);
      isValid = false;
    } else {
      hideError(input, index); 
    }
  });

  return isValid;
}


function showError(input, errorMessage, index) {
  const errorElement = errorArray[index];
  errorElement.innerHTML = errorMessage;
  errorElement.style.display = 'block';
  input.style.borderColor = 'var(--Red-error)';
  input.style.borderWidth = '1.5px';
}

function hideError(input, index) {
  const errorElement = errorArray[index];
  errorElement.style.display = 'none';
  input.style.borderColor = 'var(--Light-grayish-violet)';
}





// Function to check if the count and cvc inputs contain only numbers or not
function isNumber() {
  const countRegex = /^[0-9]+$/;
  let isValid = true;

  if (!countRegex.test(inputCount.value)) {
    showError(inputCount, 'Wrong format, numbers only');
    isValid = false;
  } else {
    hideError(inputCount);
  }

  if (!countRegex.test(inputCvc.value)) {
    showError(inputCvc, 'Wrong format, numbers only');
    isValid = false;
  } else {
    hideError(inputCvc);
  }

  return isValid;
}

// Function to check if the month and year inputs are valid or not
function validDate() {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1; // Months are 0-indexed (January is 0), so we add 1

  const inputYearValue = parseInt(inputYear.value, 10);
  const inputMonthValue = parseInt(inputMonth.value, 10);

  if (
    inputYearValue < currentYear ||
    (inputYearValue === currentYear && inputMonthValue < currentMonth)
  ) {
    showError(inputMonth, 'Invalid date');
    showError(inputYear, 'Invalid date');
    return false; // Return false for invalid date
  } else {
    hideError(inputMonth);
    hideError(inputYear);
    return true; // Return true for valid date
  }
}


function validate(e) {
  e.preventDefault();
  const isValidEmpty = isEmpty();
  const isValidNumber = isNumber();
  const isValidDate = validDate();

  if (isValidEmpty && isValidNumber && isValidDate) {
   

    nameDisplay.textContent = inputName.value;
    countDisplay.textContent = inputCount.value;
    monthDisplay.textContent = inputMonth.value;
    yearDisplay.textContent = inputYear.value;
    cvcDisplay.textContent = inputCvc.value;

    confirmCard.style.display = 'none';
    completeCard.style.display = 'block';
  }
}

// Add event listener to the "Continue" button
btn2.addEventListener('click', returnPage);

function returnPage() {
  completeCard.style.display = 'none';
  confirmCard.style.display = 'block';
}
