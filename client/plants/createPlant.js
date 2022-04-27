// ------- POST REQUEST TO CREATE NEW PLANT ------ ///

const form = document.getElementById("createPlantForm");
const plantType = document.getElementById("plantType");
const nickname = document.getElementById("nickname");
const frequency = document.getElementById("frequency");
   


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const plantType = event.target.plantType.value;
    const nickname = event.target.nickname.value;
    const frequency = parseInt(document.querySelector('input[name="options"]:checked').value);
    console.log(frequency);


    await createPlant(plantType, nickname, frequency);
    form.reset();
    redirectHome();


  
});


// ----- POST REQUEST CREATING NEW PLANT ---- //
async function createPlant(plantType, nickname, frequency) {
    try{
        const createPlant = {
            plant_name: plantType,
            nickname: nickname,
            frequency: frequency
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
            window.location.hash = `#plants/${id}`
        }
    } catch (err) {
        console.warn(err);
    }
}

function redirectHome() {
    window.location.href = "plants.html";
}



