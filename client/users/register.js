// --------- REGISTER FUNCTIONALITY | register.html --------- //

// ------ register.html ------ //

const form = document.getElementById("userRegisterForm");
// BROKE
// const firstnameInput = document.getElementById("firstname");
// const usernameInput = document.getElementById("usr");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("pwd");

form.addEventListener("submit", e => {
    e.preventDefault();
    const firstname = e.target.firstname.value;
    const username = e.target.usr.value;
    const email = e.target.email.value;
    const password = e.target.pwd.value;
    console.log(firstname, username, email, password);

    userRegister(firstname, username, email, password);
    form.reset();
    redirectHome();
    // window.location.href = "login.html";
});

async function userRegister(firstname, username, email, password) {
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
        const response = await fetch("http://localhost:3000/users/register", options);
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