const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

//Show input error message
function showError(input, message) {
	// Get the parent element for overriding the label element
	const formControl = input.parentElement;
	//Override the label 'form-control' to 'form-control error'
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	//Change error message to our custom error message
	small.innerText = message;
}

// Show success outline
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

// Check required fields
function checkRequired(inputArray) {
	inputArray.forEach(function(input) {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
}

// Check Email is valid
function checkEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'Email is not valid');
	}
}

// Check input length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at lease ${min} characters`
		);
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		);
	} else {
		showSuccess(input);
	}
}

// Check password with special character
function passwordComplexity(input) {
	const re = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$/;

	if (re.test(input.value)) {
		showSuccess(input);
	} else {
		showError(
			input,
			'Password requires 8~25 characters. At least 1 uppercase, 1 lowercase, 1 digit, and 1 special character'
		);
	}
}

// Check Password2 is required
function checkPassword2(input) {
	if (input.value === '') {
		showError(input, 'Please verify the password again');
	} else {
		showSuccess(input);
	}
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
	if (input1.value !== input2.value) {
		showError(input2, 'Passwords do not match');
	}
}

// Get fieldname and make each filed name capitalized on the first word
function getFieldName(input) {
	// Take the first letter of the word and make it upper case + the rest of the word (first letter was cut out)
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
	e.preventDefault(); //Stop flashing and submitting itself

	checkRequired([username, email, password]);
	checkEmail(email);
	checkLength(username, 3, 15);
	checkLength(password, 8, 25);
	passwordComplexity(password);
	checkPassword2(password2);
	checkPasswordsMatch(password, password2);
});
