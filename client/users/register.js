// --------- REGISTER FUNCTIONALITY | register.html --------- //

// ------ register.html ------ //

const form = document.getElementById("userRegisterForm");
const firstname = document.getElementById("firstname");
const username = document.getElementById("usr");
const email = document.getElementById("email");
const password = document.getElementById("pwd");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstname = event.target.firstname.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    userRegister(firstname, username, email, password);
    form.reset();
    redirectHome();
    window.location.href = "login.html";
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
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userRegisterElements)
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

function redirectHome() {
    window.location.href = "login.html";
}