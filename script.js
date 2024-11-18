let lightmode = true;

function addTask(event) {
    event.preventDefault(); // Prevents page reload

    // Load elements
    const task_input = document.getElementById("task");
    const task_list = document.getElementById("task-list");

    // Create a new list element
    const listItem = document.createElement("li");
    const listItemText = document.createElement("span");
    listItemText.textContent = task_input.value;
    listItem.appendChild(listItemText);

    // Add option to delete the task through a button
    const deleteButton = document.createElement("img");
    deleteButton.src = "delete.png";
    deleteButton.style.width = "20px";
    listItem.appendChild(deleteButton);
    deleteButton.addEventListener("click", function () {
        listItem.style.transition = "transform 0.5s ease, opacity 0.5s ease"; // Apply transition for slide and fade
        listItem.style.transform = "translateX(-100%)"; // Slide the element off-screen
        listItem.style.opacity = "0"; // Fade the element
    
        setTimeout(() => {
            listItem.remove(); // Remove after animation
        }, 500); // Match the animation duration
    });

    // Add option to mark the task as done
    const doneButton = document.createElement("img");
    doneButton.src = "done.png";
    doneButton.style.width = "20px";
    listItem.appendChild(doneButton);
    doneButton.addEventListener("click", function () {
        // Add the animation class to start the animation
        listItem.classList.add("done");
        // Ensure background color change and line-through are applied
        listItem.style.textDecoration = "line-through";
    });

    // Add option to edit the task
    const editButton = document.createElement("img");
    editButton.src = "edit.png";
    editButton.style.width = "20px";
    listItem.appendChild(editButton);
    editButton.addEventListener("click", function () {
        // Make the item editable
        listItemText.contentEditable = true;
        listItemText.focus();
        // Save the changes
        listItemText.addEventListener("blur", function () {
            listItemText.contentEditable = false;
        });
    });

    task_list.appendChild(listItem);
    // Ensure that icons follow theme
    if (!lightmode) {
        let icons = listItem.getElementsByTagName("img");
        for (let i = 0; i < icons.length; i++) {
            icons[i].style.filter = "invert(1)";
        }
    }
    // Clear the input field
    task_input.value = "";
}

// toggle Light and dark mode
function toggleMode() {
    if (lightmode) {
        document.body.style.backgroundColor = "#333";
        const container = document.getElementsByClassName("container");
        container[0].style.backgroundColor = "#111";
        container[0].style.boxShadow = "none";
        container[0].style.animation = "rainbow 3s infinite"
        document.body.style.color = "white";
        document.documentElement.style.setProperty("--list_odd", "#222");
        document.documentElement.style.setProperty("--task_done", "green");
        // Make icons white
        const images = document.getElementsByTagName("img");
        for (let i = 0; i < images.length; i++) {
            images[i].style.filter = "invert(1)";
        }
        const darkModeBtn = document.getElementById("darkModeBtn");
        darkModeBtn.textContent = "Light Mode";
        darkModeBtn.style.filter = "invert(1)";
        lightmode = false;
    } else {
        document.body.style.backgroundColor = "#ccc";
        const container = document.getElementsByClassName("container");
        container[0].style.backgroundColor = "#eee"; 
        container[0].style.animation = "none";
        container[0].style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        document.body.style.color = "black";
        document.documentElement.style.setProperty("--list_odd", "#f9f9f9");
        document.documentElement.style.setProperty("--task_done", "lightgreen");
        // Make icons black
        const images = document.getElementsByTagName("img");
        for (let i = 0; i < images.length; i++) {
            images[i].style.filter = "invert(0)";
        }
        const darkModeBtn = document.getElementById("darkModeBtn");
        darkModeBtn.textContent = "Dark Mode";
        darkModeBtn.style.filter = "invert(0)";
        lightmode = true;
    }
}

// Mini-Game Script
let score = 0;
let isGameActive = false;
let timer = 30;

function startGame() {
    if (isGameActive) return; // Prevent restarting if already active
    
    const game = document.getElementById("game");
    const circle = document.getElementById("circle");
    const gameArea = document.getElementById("game-area");
    const scoreDisplay = document.getElementById("score");
    const timeDisplay = document.getElementById("timer");
    
    // Show the game with slide animation
    game.classList.add("visible");
    circle.style.display = "block";
    score = 0;
    timer = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timer;
    isGameActive = true;

    
    function moveCircle() {
        if (!isGameActive) return;

        const maxX = gameArea.offsetWidth - circle.offsetWidth;
        const maxY = gameArea.offsetHeight - circle.offsetHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        circle.style.left = `${randomX}px`;
        circle.style.top = `${randomY}px`;

        setTimeout(moveCircle, 1000); // Move every second
    }

    // Countdown timer
    const countdown = setInterval(() => {
        if (timer > 0) {
            timer--;
            timeDisplay.textContent = timer;
        } else {
            clearInterval(countdown); // Stop the timer
            endGame();
        }
    }, 1000);

    // Increment score on click
    circle.addEventListener("click", function () {
        if (isGameActive) {
            score++;
            scoreDisplay.textContent = score;
        }
    });

    moveCircle();

    // End the game
    function endGame() {
        isGameActive = false;
        // Hide the game with slide animation
        game.classList.remove("visible");
        setTimeout(() => {
            alert(`Game Over! Your final score is ${score}.`);
        }, 500); // Delay to allow the animation to finish
    }
}