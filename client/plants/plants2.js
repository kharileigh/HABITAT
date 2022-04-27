// ------- NEW PLANT FUNCTIONALITY | plants.html -------- //
// needs to add habits to this function :

const form = document.getElementById("newPlantForm");
const plantname = document.getElementById("plantname");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target.plantname.value;

    addPlant(name);
    form.reset();
    redirectHome();
    window.location.href = "trackers.html";
})

async function addPlant(name) {
    e.preventDefault();
    try {
        const plantElements = {
            name: name
        }
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(Object.fromEntries(plantElements))
        }
        const response = await fetch("http://localhost:3000/plants", options);
        const { id, err } = await response.json();
        if(err) {
            throw Error(err)
        } else {
            window.location.hash = `plants/${id}`
        }
    } catch (err) {
        console.warn(err);
    }
}

function redirectHome() {
    window.location.href = "trackers.html";
}

// ------- SELECT PLANT FUNCTION | plants.html -----?