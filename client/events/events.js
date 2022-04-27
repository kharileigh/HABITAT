//  ---- GET REQUEST FROM EVENTS TABLE ---- //

//           TO BE COMPLETED!!!!!!!!!!!

function fetchData() {
    fetch("http://localhost:3000/plants")
        .then(response => {
            console.log(response);
            if(!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            // --- guard condition | check this for immediately fails first --- //
            if (data.data.length === 0) {
                window.location.href = "createPlant.html"
            }

            // ---- map gives back an array of Plant with its details as on object ---- //
            console.log(data.data);
            const html = data.data
                .map(plant => {
                    return `
                        <p> ${plant.nickname} </p>
                    `;
                })
                .join("");

            document
                .querySelector("plantInfo")
                .insertAdjacentHTML('afterbegin', html);

        })
        // ----- REDIRECT USER HERE TO CREATE PLANT PAGE???
        .catch(error => {
            console.log(error);
        });

     

fetchData();