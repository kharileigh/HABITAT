// ------- POST REQUEST TO CREATE NEW PLANT ------ ///

const form = document.getElementById("createPlantForm");
// BROKE
// const plantType = document.getElementById("plantType");
// const nickname = document.getElementById("nickname");
// const frequency = document.getElementById("frequency");
   


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const plantType = event.target.pT.value;
    const nickname = event.target.nickname.value;
    const frequency = parseInt(document.querySelector('input[name="options"]:checked').value);


    await createPlant(plantType, nickname, frequency);
    form.reset();
    redirectHome();


  
});


// ----- function to create new plant ---- //
async function createPlant(plantType, nickname, frequency) {
    try{
        const plantToCreate = {
            plant_name: plantType,
            nickname: nickname,
            frequency: frequency,
            count: 0
        }
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(plantToCreate)
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



