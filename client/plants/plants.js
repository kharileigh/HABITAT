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
  //getItem(1);
  // // ----- DOM MANIPULATION TO ADD USER'S PLANTS TO plants.html ----------- //
  const main = document.querySelector('main');
  const plantCard = document.querySelector("#plantInfo");
  let card = document.createElement("div");
  // const plantNickname = plantCard.querySelector("h2");
  // const plantName = plantCard.querySelector("h3");
  
  //calling the renderPlantModal function to display plant info 
//   async function loadPlantModal() {
//     plantCard.innerHTML = "";
//     const data = await getAll();
//     loadIndexFor();
//     renderPlantModal(data);

//   }
  
  async function loadIndexFor() {
    const data = await getAll();
    data.forEach((a) => renderCard(a, data));
  }

  async function loadPlantIndex(id) {
   
      const data = await getItem(id);
      card.style.display = 'none';
        renderPlant(data);
  }

  function updateMain() {
      main.style.display = 'none';
  }

 // window.addEventListener('click', updateMain);

  //let button;
  //button.addEventListener('click', getItem)

  function renderCard(data) {
    let id = data.plantid;
    let card = document.createElement("div");
    card.className = "card";
    card.textContent = data.name;
    main.appendChild(card);
    let button = document.createElement("button")
    button.onclick = () => updateMain();
    button.onclick = () => loadPlantIndex(id);
    
    card.appendChild(button);
    const plantNickname = document.createElement("h2");
    plantNickname.textContent = data.nickname;
    const plantName = document.createElement("h3");
    plantName.textContent = data.plant_name;
    button.appendChild(plantNickname);
    button.appendChild(plantName);
  }




function renderPlant(data) {

  let freq;
//   function convertFrequency(data) {
//     if (data.frequency == 365) {
//        return freq = "daily";
//     } else if (data.frequency == 52) {
//         return freq = "weekly";
//     } else {
//         return freq = "monthly";
//     }
// }
    
    let card2 = document.createElement("div");
    card2.className = "card";
    main.appendChild(card2);
    const plantNickname = document.createElement("h2");
    plantNickname.textContent = data.nickname;
    const plantName = document.createElement("h3");
    plantName.textContent = data.plant_name;
    // convertFrequency();
    // const frequency = document.createElement("p");
    // frequency.textcontent = `${data.nickname} needs ${freq} watering!`;
    const streak = document.createElement("p");
    streak.textcontent = `Your current streak is ${data.count}`;
      const wateringBtn = document.createElement("button");
      wateringBtn.textContent = "Water Me!";
         card.appendChild(plantNickname);
         card.appendChild(plantName);
        // card.appendChild(frequency);
         card.appendChild(streak);
         card.appendChild(wateringBtn);
  }
  




//   // ---- adds information to html page ---- //
//   function renderPlantModal(data) {
//     // plantNickname.textContent = `${plants.nickname}`;
//     // plantName.textContent = `${plants.plant_name}`;
//     const plantNickname = document.createElement("h2");
//     plantNickname.textContent = data.nickname;
//     const plantName = document.createElement("h3");
//     plantName.textContent = data.plant_name;
//     const wateringBtn = document.createElement("button");
//     wateringBtn.textContent = "Water Me!";
//     wateringBtn.onclick = () => {
//       window.location.href = "events.html";
//     };
//      }
  loadIndexFor();
