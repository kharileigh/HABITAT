//  ---- GET REQUEST TO GET PLANTS FROM DATABASE ---- //

function fetchData() {
  fetch("http://localhost:3000/plants")
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      // --- guard condition | check this for immediately fails first --- //
      console.log(data);
      if (data.length === 0) {
        // window.location.href = "createPlant.html"
      }

<<<<<<< Updated upstream
      // ---- map gives back an array of Plant with its details as on object ---- //
      console.log(data);
      const html = data
        .map((plant) => {
          return `
                        <p> ${plant.nickname} </p>
=======
            console.log(response);
            if(!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            // --- guard condition | check this for immediately fails first --- //
            console.log(data);
            if (data.length === 0) {
                window.location.href = "createPlant.html"
            }

            // ---- map gives back an array of Plant with its details as on object ---- //
            console.log(data);
            const html = data
                .map(plant => {
                    return `
                        <h1> ${plant.plant_name} </h1>
                        <h3> ${plant.nickname} </h3>
                        <button> ${plant.frequency}
                            <a href="events.html">See </a>
                        </button>
>>>>>>> Stashed changes
                    `;
        })
<<<<<<< Updated upstream
        .join("");
=======
        
        .catch(error => {
            console.log(error);
        });
    
}     
>>>>>>> Stashed changes

      document
        .querySelector("#plantInfo")
        .insertAdjacentHTML("afterbegin", html);
    })
    // ----- REDIRECT USER HERE TO CREATE PLANT PAGE???
    .catch((error) => {
      console.log(error);
      window.location.href = "createPlant.html";
    });
}

fetchData();
