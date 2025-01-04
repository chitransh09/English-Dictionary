
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const toggleToSignup = document.getElementById("toggle-to-signup");
    const toggleToLogin = document.getElementById("toggle-to-login");

    toggleToSignup.addEventListener("click", () => {
        loginForm.classList.remove("active");
        signupForm.classList.add("active");
    });

    toggleToLogin.addEventListener("click", () => {
        signupForm.classList.remove("active");
        loginForm.classList.add("active");
    });
});

// Local storage for user data
let users = JSON.parse(localStorage.getItem("users")) || [];

// Handle Signup
document.getElementById("signup-btn").addEventListener("click", () => {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!name || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    if (users.some(user => user.email === email)) {
        alert("Email already exists!");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login.");
    document.getElementById("signup-form").classList.remove("active");
    document.getElementById("login-form").classList.add("active");
});

// Handle Login
document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("Invalid email or password!");
        return;
    }

    // Set login status in localStorage
    localStorage.setItem("loggedIn", true);

    // Redirect to the dictionary page
    window.location.href = "../index.html";
});
