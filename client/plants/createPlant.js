// ------- POST REQUEST TO CREATE NEW PLANT ------ ///

const form = document.getElementById("createPlantForm");
const plantType = document.getElementById("plantType");
const nickname = document.getElementById("nickname");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const plantType = event.target.plantType.value;
    const nickname = event.target.nickname.value;

    createPlant(plantType, nickname);
    form.reset();
    redirectHome();
    window.location.href = "plants.html";
});

async function createPlant(plantType, nickname) {
    e.preventDefault();
    try{
        const createPlant = {
            plant_name: plantType,
            nickname: nickname,
        }
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(Object.fromEntries(createPlant))
        }
        const response = await fetch("http://localhost:3000/plants", options);
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
    window.location.href = "plants.html";
}



