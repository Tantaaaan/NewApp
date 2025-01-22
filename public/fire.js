import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQNtyxpIpCkHemNoSgpRycYBh3GjFGdpg",
    authDomain: "security-80821.firebaseapp.com",
    databaseURL: "https://security-80821-default-rtdb.firebaseio.com",
    projectId: "security-80821",
    storageBucket: "security-80821.firebasestorage.app",
    messagingSenderId: "616827998516",
    appId: "1:616827998516:web:1dddc1569ba2d40fc4d561"
  };
  
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

    registerFormElement.addEventListener('submit', function (event) {
        event.preventDefault();
    
        const username = document.getElementById('register-username').value;
        const fullname = document.getElementById('register-fullname').value;
        const age = parseInt(document.getElementById('register-age').value, 10);
        const password = document.getElementById('register-password').value;
    
        if (!username || !fullname || isNaN(age) || !password) {
            alert('Please fill out all fields.');
            return;
        }
    
        if (password.length < 9) {
            document.getElementById('password-warning').style.display = 'block';
            return;
        }
    
        if (age < 18) {
            document.getElementById('age-warning').style.display = 'block';
            return;
        }
    
        // Hash password using the PHP script
        fetch('hash_password.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.hashedPassword) {
                    const hashedPassword = data.hashedPassword;
    
                    // Store user data in Firebase
                    set(ref(database, 'Accounts/' + username), {
                        fullName: fullname,
                        Age: age,
                        Password: hashedPassword, // Store hashed password
                    })
                        .then(() => {
                            alert('Registration successful!');
                            toggleForm(); // Optionally switch to login form
                        })
                        .catch((error) => {
                            console.error('Database Error:', error);
                            alert('Database Error: ' + error.message);
                        });
                } else {
                    alert('Error hashing password.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error hashing password.');
            });
    });
    const loginFormElement = document.getElementById('login-form');

    if (!loginFormElement) {
        console.error('Login form not found in the DOM.');
        return;
    }

    loginFormElement.addEventListener('submit', function (event) {
        event.preventDefault();
    
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const loginWarning = document.getElementById('login-warning');
    
        if (!username || !password) {
            alert('Please fill out all fields.');
            return;
        }
    
        // Retrieve user data from the database
        get(ref(database, 'Accounts/' + username))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const user = snapshot.val();
                    const hashedPassword = user.Password; // Retrieved hashed password
    
                    // Verify password via the PHP script
                    fetch('verify_password.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            password: password,
                            hashedPassword: hashedPassword,
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.success) {
                                alert('Login successful!');
                                sessionStorage.setItem('isLoggedIn', 'true');
                                sessionStorage.setItem('username', username);
                                window.location.href = 'index.html'; // Redirect to main page
                            } else {
                                console.error(data.message || 'Invalid credentials');
                                loginWarning.style.display = 'block'; // Show login warning
                            }
                        })
                        .catch((error) => {
                            console.error('Error verifying password:', error);
                            alert('Error verifying password. Please try again.');
                        });
                } else {
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
