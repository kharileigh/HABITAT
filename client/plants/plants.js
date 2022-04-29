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

  // // ----- DOM MANIPULATION TO ADD USER'S PLANTS TO plants.html ----------- //
  const main = document.querySelector('main');
  const section = document.querySelector('section');

  async function loadIndexFor() {
    const data = await getAll();
    data.forEach((a) => renderCard(a, data));
  }

  async function loadPlantIndex(id) {
    document.getElementById("main").style.display="none";
      const data = await getItem(id);
      renderPlant(data, id);
  }

  function renderCard(data) {
    let id = data.plantid;
    let card1 = document.createElement("div");
    card1.setAttribute("id", "card1");
    card1.className = "card";
    card1.textContent = data.name;
    main.appendChild(card1);
    let button = document.createElement("button")
    button.onclick = () =>  loadPlantIndex(id);
    card1.appendChild(button);
    const plantNickname = document.createElement("h2");
    plantNickname.textContent = data.nickname;
    const plantName = document.createElement("h3");
    plantName.textContent = data.plant_name;
    button.appendChild(plantNickname);
    button.appendChild(plantName);
  }



function renderPlant(data, id) {

    let card2 = document.createElement("div");
    card2.className = "card";
    popup.appendChild(card2);
    const plantNickname = document.createElement("h2");
    plantNickname.textContent = data.nickname;
    const plantName = document.createElement("h3");
    plantName.textContent = data.plant_name;
    const streak = document.createElement("h3");
    streak.textContent = `Your current streak is ${data.count}`;
      const wateringBtn = document.createElement("button");
      wateringBtn.id = "water";
      wateringBtn.textContent = "Water Me!";
         card2.appendChild(plantNickname);
         card2.appendChild(plantName);
         card2.appendChild(streak);
         card2.appendChild(wateringBtn);
         wateringBtn.addEventListener('click', async (e) => {
           console.log("this is really difficult", id)
               try{
                   const updateCountElements = {
                       count: data.count += 1,
                       plantid: id
                   }
                   const options = {
                       method: "PUT",
                       body: JSON.stringify(updateCountElements),
                       headers: {"Content-Type": "application/json"}
                   }
                   const response = await fetch(`http://localhost:3000/plants/${id}`, options);
                   const result = await response.json();
                 
                       window.location.hash = `#plants/${id}`
                   
               } catch (err) {
                   console.warn(err);
               }
           })
            
       
        
  }
  

  loadIndexFor();


