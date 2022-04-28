// // //  ------ GET REQUEST TO GET PLANTS FROM DATABASE ----- //
async function getAll() {
  try {
    const response = await fetch("http://localhost:3000/plants");
    const data = await response.json();
    // --- guard condition | check if there is data in existence before returning any information --- //
    if (data.length === 0) {
      window.location.href = "createPlant.html";
    } else {
      console.log(data);
      return data;
    }
  } catch (err) {
    console.warn(err);
  }
}

getAll();

async function getItem(id) {
  try {
    const response = await fetch(`http://localhost:3000/plants/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.warn(err);
  }
}

// // ----- DOM MANIPULATION TO ADD USER'S PLANTS TO plants.html ----------- //

const plantCard = document.querySelector("#plantInfo");
// const plantNickname = plantCard.querySelector("h2");
// const plantName = plantCard.querySelector("h3");

// ---- calling the renderPlantModal function to display plant info ---- //
async function loadPlantModal(plantid) {
  plantCard.innerHTML = "";
  const data = await getItem(plantid);
  renderPlantModal(data);
}

async function loadIndexFor() {
  const data = await getAll();
  data.forEach((a) => renderCard(a, plants));
}

function renderCard(data) {
  let card = document.createElement("div");
  card.className = "card";
  card.textContent = data.name;
}

// ---- adds information to html page ---- //
function renderPlantModal(plant) {
  // plantNickname.textContent = `${plants.nickname}`;
  // plantName.textContent = `${plants.plant_name}`;
  const plantNickname = document.createElement("h2");
  plantNickname.textContent = plant.nickname;
  const plantName = document.createElement("h3");
  plantName.textContent = plant.plant_name;
  const wateringBtn = document.createElement("button");
  wateringBtn.textContent = "Water Me!";
  wateringBtn.onclick = () => {
    window.location.href = "events.html";
  };
  plantCard.appendChild(plantNickname);
  plantCard.appendChild(plantName);
  plantCard.appendChild(wateringBtn);
}

loadPlantModal();

// function fetchData() {
//   fetch("http://localhost:3000/plants")
//     .then((response) => {
//       console.log(response);
//       if (!response.ok) {
//         throw Error("ERROR");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // --- guard condition | check this for immediately fails first --- //
//       console.log(data);
//       if (data.length === 0) {
//         // window.location.href = "createPlant.html"
//       }

//       // ---- map gives back an array of Plant with its details as on object ---- //
//       console.log(data);
//       const html = data
//         .map((plant) => {
//           return `
//                   <p> ${plant.nickname} </p>
//                 `;
//         })
//         .join("");

//       document
//         .querySelector("#plantInfo")
//         .insertAdjacentHTML("afterbegin", html);
//     })
//     // ----- REDIRECT USER HERE TO CREATE PLANT PAGE???
//     .catch((error) => {
//       console.log(error);
//       window.location.href = "createPlant.html";
//     });
// }

// fetchData();
