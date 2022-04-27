// //  ------ GET REQUEST TO GET PLANTS FROM DATABASE ----- //
// async function getAll(plants) {
//   try {
//     const response = await fetch ("http://localhost:3000/plants");
//     const data = await response.json()
//     // --- guard condition | check if there is data in existence before returning any information --- //
//     if(data.length === 0) {
//       window.location.href = "createPlant.html"
//     } else {
//       return data;
//     } 
//   } catch (err) {
//     console.warn(err);
//   }
// }

// // ----- DOM MANIPULATION TO ADD USER'S PLANTS TO plants.html ----------- //

// const plantCard = document.querySelector("plantInfo");
// const plantNickname = document.querySelector("nickname");
// const plantName = document.querySelector("plantName");

// // ---- calling the renderPlantModal function to display plant info ---- //
// async function loadPlantModal(plants, plantid) {
//   plantCardContent.innerHTML = "";
//   const data = await getItem(plants, plantid);
//   renderPlantModal(data);
// }

// // ---- adds information to html page ---- //
// function renderPlantModal(plant) {
//   plantNickname.textContent = `${plant.nickname}`;
//   plantName.textContent =`${plant.plant_name}`;
//   const wateringBtn = document.createElement("button");
//   wateringBtn.textContent = "Water Me!"; 
//   wateringBtn.onclick = () => {
//     window.location.href = "events.html"
//   };
// plantCardContent.appendChild(wateringBtn);
// }







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

      // ---- map gives back an array of Plant with its details as on object ---- //
      console.log(data);
      const html = data
        .map((plant) => {
          return `
                  <p> ${plant.nickname} </p>
                `;
        })
        .join("");

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
