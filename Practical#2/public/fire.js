import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnC5B7ekE6Gd2wv2pMjFvRGSUV4nIYbGw",
    authDomain: "practical2-1a4ee.firebaseapp.com",
    databaseURL: "https://practical2-1a4ee-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "practical2-1a4ee",
    storageBucket: "practical2-1a4ee.appspot.com",
    messagingSenderId: "89495844074",
}  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById('register-form').addEventListener('submit', function(event) {
    const ageInput = document.getElementById('register-age');
    const age = parseInt(ageInput.value, 10);
    const warningMessage = document.getElementById('age-warning');

    if (age < 18) {
        // Prevent form submission
        event.preventDefault();
        // Show warning message
        warningMessage.style.display = 'block';
    } else {
        // Hide warning message if age is valid
        warningMessage.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const registerFormElement = document.getElementById('register-form');

    if (!registerFormElement) {
        console.error('Register form not found in the DOM.');
        return;
    }

    registerFormElement.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('register-username').value;
        const fullname = document.getElementById('register-fullname').value;
        const age = parseInt(document.getElementById('register-age').value, 10);
        const password = document.getElementById('register-password').value;

        // Clear previous warnings
        document.getElementById('password-warning').style.display = 'none';
        document.getElementById('age-warning').style.display = 'none';

        if (!username || !fullname || isNaN(age) || !password) {
            console.error('One or more form fields are missing.');
            alert('Please fill out all fields.');
            return;
        }

        // Validate password length
        if (password.length < 9) {
            console.error('Password must be more than 8 characters long.');
            document.getElementById('password-warning').style.display = 'block';
            return;
        }

        if (age < 18) {
            console.error('You must be at least 18 years old.');
            document.getElementById('age-warning').style.display = 'block';
            return;
        }

        // Check if username already exists
        get(ref(database, 'Accounts/' + username))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.error('Username already exists.');
                    alert('Username already exists. Please choose another one.');
                } else {
                    // Store user data in the database
                    set(ref(database, 'Accounts/' + username), {
                        fullName: fullname,
                        Age: age,
                        Password: password // Note: Storing passwords in plain text is not secure
                    })
                    .then(() => {
                        alert('Registration successful!');
                        toggleForm(); // Optionally switch to login form
                    })
                    .catch((error) => {
                        console.error('Database Error:', error);
                        alert('Database Error: ' + error.message);
                    });
                }
            })
            .catch((error) => {
                console.error('Database Error:', error);
                alert('Database Error: ' + error.message);
            });
    });

    const loginFormElement = document.getElementById('login-form');

    if (!loginFormElement) {
        console.error('Login form not found in the DOM.');
        return;
    }

    loginFormElement.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const loginWarning = document.getElementById('login-warning');

        if (!username || !password) {
            console.error('One or more form fields are missing.');
            alert('Please fill out all fields.');
            return;
        }

        // Retrieve user data from the database
        get(ref(database, 'Accounts/' + username))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const user = snapshot.val();

                    if (user.Password === password) {
                        alert('Login successful!');
                        sessionStorage.setItem('isLoggedIn', 'true');
                        sessionStorage.setItem('username', username);
                        window.location.href = 'index.html'; // Redirect to local file
                    } else {
                        loginWarning.style.display = 'block'; // Show login warning
                    }
                } else {
                    // Redirect to registration page if username does not exist
                    alert('Username does not exist. Redirecting you to registration page.');
                    toggleForm(); // Switch to registration form
                }
            })
            .catch((error) => {
                console.error('Database Error:', error);
                alert('Database Error: ' + error.message);
            });
    });
});
