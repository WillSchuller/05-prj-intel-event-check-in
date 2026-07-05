const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const popupOverlay = document.getElementById("popupOverlay");
const popupMessage = document.getElementById("popupMessage");
const closePopupBtn = document.getElementById("closePopupBtn");

let count = 0;
const maxCount = 50;

closePopupBtn.addEventListener("click", function () {
  popupOverlay.classList.remove("show");
});

popupOverlay.addEventListener("click", function (event) {
  if (event.target === popupOverlay) {
    popupOverlay.classList.remove("show");
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value;
  console.log(name, team);

  const previousCount = count;
  count = Math.min(count + 1, maxCount);
  console.log("total check-ins", count);

  const percentage = Math.round((count / maxCount) * 100);
  console.log(percentage);

  attendeeCount.textContent = count;
  progressBar.style.width = percentage + "%";

  const teamCounter = document.getElementById(team + "Count");
  console.log(teamCounter);
  if (teamCounter) {
    const currentTeamCount = parseInt(teamCounter.textContent, 10);
    teamCounter.textContent = currentTeamCount + 1;
  }

  const teamNames = {
    water: "Team Water Wise",
    zero: "Team Net Zero",
    power: "Team Renewables",
  };

  const teamCounts = {
    water: parseInt(document.getElementById("waterCount").textContent, 10),
    zero: parseInt(document.getElementById("zeroCount").textContent, 10),
    power: parseInt(document.getElementById("powerCount").textContent, 10),
  };

  let leadingTeam = "";
  let leadingScore = 0;

  if (teamCounts.water > leadingScore) {
    leadingTeam = teamNames.water;
    leadingScore = teamCounts.water;
  }

  if (teamCounts.zero > leadingScore) {
    leadingTeam = teamNames.zero;
    leadingScore = teamCounts.zero;
  }

  if (teamCounts.power > leadingScore) {
    leadingTeam = teamNames.power;
    leadingScore = teamCounts.power;
  }

  greeting.textContent = `Welcome, ${name} from ${team}!`;
  console.log(greeting.textContent);

  if (count === maxCount && previousCount < maxCount) {
    popupMessage.textContent = `${leadingTeam} is currently in the lead with ${leadingScore} check-ins.`;
    popupOverlay.classList.add("show");
  }

  form.reset();
});
