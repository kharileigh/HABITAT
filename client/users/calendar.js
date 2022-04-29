let nav = 0;
let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const calendar = document.getElementById("calendar");
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Variables for the event function
const newEventModal = document.getElementById("newEventModal");
const backDrop = document.getElementById("modelB ackDrop");

//   a reusable function for when the file loads
function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  //   console.log(firstDayOfMonth);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  //   console.log(daysInMonth); this gives us how many days in the month, the 0 gives us the last date of the previous month

  //   console.log(day, month, year); displays as an index value, i.e. April = 3(+1)
  const dataString = firstDayOfMonth.toLocaleDateString("en-uk", {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dataString.split(", ")[0]);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-uk",
    { month: "short" }
  )} ${year}`;

  calendar.innerHTML = ""; //Wiping out the calendar square each time it loads to avoid duplicating the calendar

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");
    // console.log(daySquare);

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      daySquare.id = `${year}-${month}-${i - paddingDays}`;
      console.log(daySquare);

      // Adding in new feature here

      if (daySquare.id == "2022-3-18") {
        daySquare.style.backgroundColor = "#97f3b1";
      }
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });
}

initButtons();
load();
