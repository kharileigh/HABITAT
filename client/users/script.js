// --------- LOGIN FUNCTIONALITY | login.html --------- //

const form = document.getElementById("userLoginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");

console.log(form);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;

  userLogin(username, password);
  form.reset();
  redirectHome();
  window.location.href = "plants.html";
});

async function userLogin(username, password) {
  e.preventDefault();
  try {
    const userLoginElements = {
      username: username,
      password: password
    };
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLoginElements)
    };
    const response = await fetch("http://localhost:3000/users", options);
    const { id, err } = await response.json();
    if (err) {
      throw Error(err);
    } else {
      window.location.hash = `#users/${id}`;
    }
  } catch (err) {
    console.warn(err);
  }
}

function redirectHome() {
  window.location.href = "plants.html";
}
