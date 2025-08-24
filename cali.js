
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("history-list");
const themeToggle = document.getElementById("theme-toggle");
const clearHistoryBtn = document.getElementById("clear-history");

let history = [];

// Add button functionality
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "C") {
      display.value = "";
    } else if (value === "=") {
      try {
        const result = eval(display.value);
        if (result !== undefined) {
          addToHistory(display.value + " = " + result);
          display.value = result;
        }
      } catch {
        display.value = "Error";
      }
    } else {
      display.value += value;
    }
  });
});

// Add to history
function addToHistory(entry) {
  history.unshift(entry);
  renderHistory();
}

// Render history
function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.onclick = () => {
      display.value = item.split("=")[1].trim();
    };
    historyList.appendChild(li);
  });
}

// Clear history
clearHistoryBtn.onclick = () => {
  history = [];
  renderHistory();
};

// Toggle theme
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

// Keyboard input
document.addEventListener("keydown", (e) => {
  if (/[0-9+\-*/%.()]/.test(e.key)) {
    display.value += e.key;
  } else if (e.key === "Enter") {
    try {
      const result = eval(display.value);
      if (result !== undefined) {
        addToHistory(display.value + " = " + result);
        display.value = result;
      }
    } catch {
      display.value = "Error";
    }
  } else if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (e.key === "Escape") {
    display.value = "";
  }
});
