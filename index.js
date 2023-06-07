// Get the game clock and shot clock elements
var gameClock = document.getElementById('game-clock');
var shotClock = document.getElementById('shot-clock');

// Set the initial time to 12 minutes (720 seconds) for the game clock
var gameTimeInSeconds = 720;

// Set the initial time to 24 seconds for the shot clock
var shotTimeInSeconds = 24;

// Variables to store the interval IDs
var gameClockIntervalId;
var shotClockIntervalId;
var isTimerRunning = false; // Track if the timer is running or not

// Function to update the game clock display
function updateGameClock() {
  // Calculate minutes and seconds
  var minutes = Math.floor(gameTimeInSeconds / 60);
  var seconds = gameTimeInSeconds % 60;

  // Add leading zeros if necessary
  var formattedTime = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);

  // Update the game clock display
  gameClock.innerHTML = formattedTime;
  applyStyling(gameClock);
}

// Function to update the shot clock display
function updateShotClock() {
  // Format the time to display only seconds
  var formattedTime = ('0' + shotTimeInSeconds).slice(-2);

  // Update the shot clock display
  shotClock.innerHTML = formattedTime;
  applyStyling(shotClock);
}

// Function to apply styling to the clock elements
function applyStyling(clockElement) {
  clockElement.style.fontFamily = 'Digital Readout, Arial, sans-serif';
  clockElement.style.backgroundColor = 'gray';
  clockElement.style.backgroundSize = 'cover';
  clockElement.style.fontSize = '80px';
  clockElement.style.marginTop = '0px';
  clockElement.style.padding = '0px 4px';
  clockElement.style.textAlign = 'center';
  clockElement.style.justifyContent = 'center';
  clockElement.style.alignItems = 'center';
  clockElement.style.borderRadius = '5px';
  clockElement.style.backgroundColor = 'gray';
  clockElement.style.webkitTextStroke = '1px black';
  clockElement.style.textShadow = '2px 2px 4px black';
  clockElement.style.color = 'yellow';
}

// Function to start the game clock
function startGameClock() {
  // Clear any previous intervals to prevent multiple intervals running concurrently
  clearInterval(gameClockIntervalId);

  // Update the game clock display
  updateGameClock();

  // Start the interval to update the game clock every second
  gameClockIntervalId = setInterval(function () {
    // Decrease the time by 1 second
    gameTimeInSeconds--;

    // Check if the game time has reached 0
    if (gameTimeInSeconds <= 0) {
      // Clear the interval
      clearInterval(gameClockIntervalId);
      // Stop the shot clock
      clearInterval(shotClockIntervalId);
    }

    // Update the game clock display
    updateGameClock();
  }, 1000);
}

// Function to start the shot clock
function startShotClock() {
  // Clear any previous intervals to prevent multiple intervals running concurrently
  clearInterval(shotClockIntervalId);

  // Update the shot clock display
  updateShotClock();

  // Start the interval to update the shot clock every second
  shotClockIntervalId = setInterval(function () {
    // Decrease the time by 1 second
    shotTimeInSeconds--;

    // Check if the shot time has reached 0
    if (shotTimeInSeconds <= 0) {
      // Clear the interval
      clearInterval(shotClockIntervalId);
      // Reset the shot clock to 24 seconds
      shotTimeInSeconds = 24;
    }

    // Update the shot clock display
    updateShotClock();
  }, 1000);
}

// Function to reset the shot clock to 24 seconds
function resetShotClock() {
  shotTimeInSeconds = 24;
  updateShotClock();
}

// Function to reset the game clock and shot clock to their initial values
function resetAll() {
  gameTimeInSeconds = 720;
  shotTimeInSeconds = 24;
  updateGameClock();
  updateShotClock();
}

// Event listeners for single and double clicks on the game clock
gameClock.addEventListener('click', function () {
  if (gameClockIntervalId) {
    // If the interval is running, stop the game clock and shot clock
    clearInterval(gameClockIntervalId);
    clearInterval(shotClockIntervalId);
    gameClockIntervalId = null;
    isTimerRunning = false; // Set timer running flag to false
  } else {
    // If the interval is not running and timer is not already running, start the game clock and shot clock
    if (!isTimerRunning) {
      startGameClock();
      startShotClock();
      isTimerRunning = true; // Set timer running flag to true
    }
  }
});

gameClock.addEventListener('dblclick', function () {
  if (!gameClockIntervalId) {
    // If the interval is not running, reset the game clock and shot clock
    resetAll();
    isTimerRunning = false; // Set timer running flag to false
  }
});

// Event listeners for home-score and guest-score updates
var homeScoreElement = document.getElementById('home-score');
var guestScoreElement = document.getElementById('guest-score');

homeScoreElement.addEventListener('input', function () {
  resetShotClock();
});

guestScoreElement.addEventListener('input', function () {
  resetShotClock();
});

// Function to manually reset the shot clock when clicked
function resetShot() {
  resetShotClock();
}

// Event listener for the "NEW SHOT" button
var resetShotButton = document.getElementById('reset-shot-btn');
resetShotButton.addEventListener('click', resetShot);



// Function to increment the home score by 1
function incrementHomeScore() {
  var homeScoreElement = document.getElementById('home-score');
  var currentScore = parseInt(homeScoreElement.innerText);
  homeScoreElement.innerText = currentScore + 1;
}

// Function to decrement the home score by 1
function decrementHomeScore() {
  var homeScoreElement = document.getElementById('home-score');
  var currentScore = parseInt(homeScoreElement.innerText);
  homeScoreElement.innerText = currentScore - 1;
}

// Event listener for single click on the home score display
var homeScoreDisplay = document.getElementById('home-score');
homeScoreDisplay.addEventListener('click', incrementHomeScore);

// Event listener for double click on the home score display
homeScoreDisplay.addEventListener('dblclick', decrementHomeScore);

// Function to increment the period count by 1
function incrementPeriodCount() {
  var periodCounter = document.getElementById('period-counter');
  var currentCount = parseInt(periodCounter.innerText);
  
  // Check if the count has reached 9
  if (currentCount < 9) {
    periodCounter.innerText = currentCount + 1;
  } else {
    periodCounter.innerText = 1; // Restart the count from 1
  }
}

// Event listener for single click on the period counter display
var periodCounterDisplay = document.getElementById('period-counter');
periodCounterDisplay.addEventListener('click', incrementPeriodCount);

// Function to increment the guest score by 1
function incrementGuestScore() {
  var guestScore = document.getElementById('guest-score');
  var currentScore = parseInt(guestScore.innerText);
  guestScore.innerText = currentScore + 1;
}

// Function to decrement the guest score by 1
function decrementGuestScore() {
  var guestScore = document.getElementById('guest-score');
  var currentScore = parseInt(guestScore.innerText);
  guestScore.innerText = currentScore - 1;
}

// Event listener for single click on the guest score display
var guestScoreDisplay = document.getElementById('guest-score');
guestScoreDisplay.addEventListener('click', incrementGuestScore);

// Event listener for double click on the guest score display
guestScoreDisplay.addEventListener('dblclick', decrementGuestScore);

// Function to increment the home fouls count by 1
function incrementHomeFouls() {
  var homeFouls = document.getElementById('home-fouls');
  var currentCount = parseInt(homeFouls.innerText);

  // Check if the count has reached 25
  if (currentCount < 25) {
    homeFouls.innerText = currentCount + 1;
  } else {
    homeFouls.innerText = 0; // Restart the count
  }
}

// Event listener for click on the home fouls display
var homeFoulsDisplay = document.getElementById('home-fouls');
homeFoulsDisplay.addEventListener('click', incrementHomeFouls);

// Function to increment the guest fouls count by 1
function incrementGuestFouls() {
  var guestFouls = document.getElementById('guest-fouls');
  var currentCount = parseInt(guestFouls.innerText);

  // Check if the count has reached 25
  if (currentCount < 25) {
    guestFouls.innerText = currentCount + 1;
  } else {
    guestFouls.innerText = 0; // Restart the count
  }
}

// Event listener for click on the guest fouls display
var guestFoulsDisplay = document.getElementById('guest-fouls');
guestFoulsDisplay.addEventListener('click', incrementGuestFouls);
















// Function to reset the styling of poss1
function resetPoss1Styling() {
  var poss1 = document.getElementById('poss1');
  poss1.style.backgroundColor = '';
  poss1.style.boxShadow = '';
  poss1.style.transform = '';
  poss1.classList.remove('active');
}

// Function to reset the styling of poss2
function resetPoss2Styling() {
  var poss2 = document.getElementById('poss2');
  poss2.style.backgroundColor = '';
  poss2.style.boxShadow = '';
  poss2.style.transform = '';
  poss2.classList.remove('active');
}

// Function to handle the click event on the poss1 element
function handlePoss1Click(event) {
  var poss1 = document.getElementById('poss1');
  var poss2 = document.getElementById('poss2');

  // Check if poss1 is already active
  var isActive = poss1.classList.contains('active');

  if (isActive) {
    // Reset styling and deactivate poss1
    resetPoss1Styling();
  } else {
    // Change the background color of poss1 to green
    poss1.style.backgroundColor = 'green';

    // Apply a yellow shadow to poss1
    poss1.style.boxShadow = '0px 0px 10px yellow';

    // Partially enlarge poss1 by 15%
    var currentWidth = parseInt(poss1.style.width);
    var currentHeight = parseInt(poss1.style.height);
    var enlargedWidth = currentWidth * 1.15;
    var enlargedHeight = currentHeight * 1.15;
    poss1.style.width = enlargedWidth + 'px';
    poss1.style.height = enlargedHeight + 'px';

    // Activate poss1
    poss1.classList.add('active');

    // Reset styling and deactivate poss2
    resetPoss2Styling();
  }
}

// Function to handle the click event on the poss2 element
function handlePoss2Click() {
  var poss1 = document.getElementById('poss1');
  var poss2 = document.getElementById('poss2');

  // Check if poss2 is already active
  var isActive = poss2.classList.contains('active');

  if (isActive) {
    // Reset styling and deactivate poss2
    resetPoss2Styling();
  } else {
    // Change the background color of poss2 to green
    poss2.style.backgroundColor = 'green';

    // Apply a yellow shadow to poss2
    poss2.style.boxShadow = '0px 0px 10px yellow';

    // Partially enlarge poss2 by 15%
    var currentWidth = parseInt(poss2.style.width);
    var currentHeight = parseInt(poss2.style.height);
    var enlargedWidth = currentWidth * 1.15;
    var enlargedHeight = currentHeight * 1.15;
    poss2.style.width = enlargedWidth + 'px';
    poss2.style.height = enlargedHeight + 'px';

    // Activate poss2
    poss2.classList.add('active');

    // Reset styling and deactivate poss1
    resetPoss1Styling();
  }
}

// Event listener for click on the poss1 element
var poss1Element = document.getElementById('poss1');
poss1Element.addEventListener('click', handlePoss1Click);

// Event listener for click on the poss2 element
var poss2Element = document.getElementById('poss2');
poss2Element.addEventListener('click', handlePoss2Click);


























// Set the initial value of guest-fouls to 0
document.getElementById('guest-fouls').textContent = '0';

// Function to reset the styling of bonus1
function resetBonus1Styling() {
  var bonus1 = document.getElementById('bonus1');
  bonus1.style.backgroundColor = '';
  bonus1.style.boxShadow = '';
  bonus1.style.transform = '';
}

// Function to handle the styling updates based on fouls count
function handleFoulsCountMutation(mutationsList, observer) {
  var bonus1 = document.getElementById('bonus1');
  var guestFouls = document.getElementById('guest-fouls');
  var foulsCount = parseInt(guestFouls.textContent);

  if (foulsCount >= 7) {
    // Change the background color of bonus1 to green and apply yellow shadow
    bonus1.style.backgroundColor = 'green';
    bonus1.style.boxShadow = '0px 0px 10px yellow';

    // Partially enlarge bonus1 by 15%
    var currentWidth = parseInt(bonus1.style.width);
    var currentHeight = parseInt(bonus1.style.height);
    var enlargedWidth = currentWidth * 1.15;
    var enlargedHeight = currentHeight * 1.15;
    bonus1.style.width = enlargedWidth + 'px';
    bonus1.style.height = enlargedHeight + 'px';
  } else if (foulsCount >= 0 && foulsCount <= 6) {
    // Reset the styling when fouls count is between 0 and 6
    resetBonus1Styling();
  }
}

// Set the initial value of guest-fouls to 0
document.getElementById('guest-fouls').textContent = '0';

// Create a MutationObserver instance to monitor changes to guest-fouls element
var observer = new MutationObserver(handleFoulsCountMutation);

// Define the options for the MutationObserver
var observerOptions = {
  childList: true, // Monitor changes to the child nodes
  subtree: true, // Monitor changes to the entire subtree
  characterData: true // Monitor changes to the text content of guest-fouls
};

// Start observing the guest-fouls element
var guestFouls = document.getElementById('guest-fouls');
observer.observe(guestFouls, observerOptions);

// Example usage:
// Update the fouls count dynamically (example: set it to 8)
guestFouls.textContent = '8';

// Reset the fouls count dynamically (example: set it to 5)
guestFouls.textContent = '5';
// Set the initial value of guest-fouls to 0
document.getElementById('guest-fouls').textContent = '0';







// Function to reset the styling of bonus2
function resetBonus2Styling() {
  var bonus2 = document.getElementById('bonus2');
  bonus2.style.backgroundColor = '';
  bonus2.style.boxShadow = '';
  bonus2.style.transform = '';
}

// Function to handle the styling updates based on home-fouls count
function handleHomeFoulsCountMutation(mutationsList, observer) {
  var bonus2 = document.getElementById('bonus2');
  var homeFouls = document.getElementById('home-fouls');
  var foulsCount = parseInt(homeFouls.textContent);

  if (foulsCount >= 7) {
    // Change the background color of bonus2 to green and apply yellow shadow
    bonus2.style.backgroundColor = 'green';
    bonus2.style.boxShadow = '0px 0px 10px yellow';

    // Partially enlarge bonus2 by 15%
    var currentWidth = parseInt(bonus2.style.width);
    var currentHeight = parseInt(bonus2.style.height);
    var enlargedWidth = currentWidth * 1.15;
    var enlargedHeight = currentHeight * 1.15;
    bonus2.style.width = enlargedWidth + 'px';
    bonus2.style.height = enlargedHeight + 'px';
  } else if (foulsCount >= 0 && foulsCount <= 6) {
    // Reset the styling when fouls count is between 0 and 6
    resetBonus2Styling();
  }
}

// Set the initial value of home-fouls to 0
document.getElementById('home-fouls').textContent = '0';

// Create a MutationObserver instance to monitor changes to home-fouls element
var observer2 = new MutationObserver(handleHomeFoulsCountMutation);

// Define the options for the MutationObserver
var observerOptions2 = {
  childList: true, // Monitor changes to the child nodes
  subtree: true, // Monitor changes to the entire subtree
  characterData: true // Monitor changes to the text content of home-fouls
};

// Start observing the home-fouls element
var homeFouls = document.getElementById('home-fouls');
observer2.observe(homeFouls, observerOptions2);

// Example usage:
// Update the fouls count dynamically (example: set it to 8)
homeFouls.textContent = '8';

// Reset the fouls count dynamically (example: set it to 5)
homeFouls.textContent = '5';

// Set the initial value of guest-fouls to 0
document.getElementById('home-fouls').textContent = '0';




function resetAll() {
  // Check if the timer is running before resetting
  if (!isTimerRunning) {
    // Reset game clock and shot clock
    gameTimeInSeconds = 720;
    shotTimeInSeconds = 24;
    updateGameClock();
    updateShotClock();

    // Reset scores
    var homeScoreElement = document.getElementById('home-score');
    var guestScoreElement = document.getElementById('guest-score');
    homeScoreElement.innerText = '0';
    guestScoreElement.innerText = '0';

    // Reset fouls
    var homeFouls = document.getElementById('home-fouls');
    var guestFouls = document.getElementById('guest-fouls');
    homeFouls.innerText = '0';
    guestFouls.innerText = '0';

    // Reset period count
    var periodCounter = document.getElementById('period-counter');
    periodCounter.innerText = '1';

    // Reset possession indicators
    resetPoss1Styling();
    resetPoss2Styling();
  }
}






