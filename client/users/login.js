// --------- LOGIN FUNCTIONALITY | login.html --------- //

const form = document.getElementById("userLoginForm");
// const emailInput = document.getElementById("username");
// const passwordInput = document.getElementById("password");




form.addEventListener("submit", e => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  console.log(email, password)
  userLogin(email, password);
  form.reset();
  // redirectHome();
  // window.location.href = "plants.html";
});

async function userLogin(email, password) {
  try {
    const userLoginElements = {
      email: email,
      password: password
    };
    const options = {
      method: "POST",
      body: JSON.stringify(userLoginElements),
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch("http://localhost:3000/users/login", options);
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

// function redirectHome() {
//   window.location.href = "plants.html";
// }
