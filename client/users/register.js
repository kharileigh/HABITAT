// --------- REGISTER FUNCTIONALITY | register.html --------- //

// ------ register.html ------ //

const form = document.getElementById("userRegisterForm");
const firstnameInput = document.getElementById("firstname");
const usernameInput = document.getElementById("usr");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("pwd");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstname = event.target.firstnameInput.value;
    const username = event.target.usernameInput.value;
    const email = event.target.emailInput.value;
    const password = event.target.passwordInput.value;

    userRegister(firstname, username, email, password);
    form.reset();
    // redirectHome();
    // window.location.href = "login.html";
});

async function userRegister(firstname, username, email, password) {
    e.preventDefault();
    try{
        const userRegisterElements = {
            firstname: firstname,
            username: username,
            email: email,
            password: password
        }
        const options = {
            method: "POST",
            body: JSON.stringify(userRegisterElements),
            headers: {"Content-Type": "application/json"}
        }
        const response = await fetch("http://localhost:3000/users", options);
        const { id, err } = await response.json();
        if(err) {
            throw Error(err)
        } else {
            window.location.hash = `#users/${id}`
        }
    } catch (err) {
        console.warn(err);
    }
}

// function redirectHome() {
//     window.location.href = "login.html";
// }