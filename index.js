const today = new Date();
const year = today.getFullYear();
const month = today.getMonth(); // Current month
const daysInMonth = new Date(year, month + 1, 0).getDate();
const storageKey = `moodTracker-${year}-${month}`;

let selectedMood = null;

const monthStr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function setMood(mood) {
    selectedMood = mood;
    alert("Select a day to log this mood!");
}

function renderCalendar() {
    // Make H2 element filled with current month and year
    const h2ele = document.getElementById('tiime');
    h2ele.innerHTML = "";
    let newh2ele = document.createElement("h2");
    newh2ele = `${monthStr[month]} ${year}`;
    h2ele.append(newh2ele);

    // Work for calender starts here
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    // Days of the week works start here
    daysOfWeek.forEach(day => {
        const dayCell = document.createElement("div");
        dayCell.textContent = day;
        dayCell.classList.add("header");
        calendar.appendChild(dayCell);
    });

    // Get stored moods
    const storedMoods = JSON.parse(localStorage.getItem(storageKey)) || {};

    // Fill in calendar days
    for (let i = 1; i <= daysInMonth; i++) {
        const dateKey = `${year}-${month + 1}-${i}`;
        const dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayCell.textContent = storedMoods[dateKey] || i;

        dayCell.onclick = () => {
            if (selectedMood) {
                storedMoods[dateKey] = selectedMood;
                localStorage.setItem(storageKey, JSON.stringify(storedMoods));
                renderCalendar();
            } else {
                alert("Select a mood first!");
            }
        };
        calendar.appendChild(dayCell);
    }
}

// Render the calendar on page load
renderCalendar();
