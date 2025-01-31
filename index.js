/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    // Loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        
        // Create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // Add the class game-card to the list
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

        // Append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function with the correct variable
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();  

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length; 
gamesCard.innerHTML = totalGames.toLocaleString();

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // log the number of unfunded games to the console
    console.log("Number of unfunded games:", unfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log("Number of funded games:", fundedGames.length);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// Add event listeners
unfundedBtn.addEventListener('click', function() {
    const unfundedGames = filterUnfundedOnly();
    addGamesToPage(unfundedGames);
});

allBtn.addEventListener('click', function() {
    showAllGames();
});

fundedBtn.addEventListener('click', function() {
    const fundedGames = filterFundedOnly();
    addGamesToPage(fundedGames);
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// use filter or reduce to count the number of unfunded games
const fundedGamesCount = GAMES_JSON.filter(game => game.pledged >= game.goal).length;

// Display the summary with the correct grammar
const summaryMessage = `
  A total of $${totalRaised.toLocaleString()} has been raised for ${fundedGamesCount + unfundedGamesCount} games.
  There ${unfundedGamesCount === 1 ? 'is' : 'are'} ${unfundedGamesCount} unfunded game${unfundedGamesCount === 1 ? '' : 's'} remaining.
`;

// Append the <p> element to the description container
const newParagraph = document.createElement("p");
newParagraph.innerHTML = summaryMessage
descriptionContainer.appendChild(newParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Destructure the first two games
const [mostFundedGame, secondMostFundedGame] = sortedGames;

// Get the first word of the most funded game and the second most funded game
const firstWordMostFunded = mostFundedGame.name.split(' ')[0];
const firstWordSecondMostFunded = secondMostFundedGame.name.split(' ')[0];

// Create a new element for the most funded game and append it
const firstGameElement = document.createElement("h3");
firstGameElement.textContent = mostFundedGame.name;
firstGameContainer.appendChild(firstGameElement);

// Create a new element for the second most funded game and append it
const secondGameElement = document.createElement("h3");
secondGameElement.textContent = secondMostFundedGame.name;
secondGameContainer.appendChild(secondGameElement);

// Output the results
console.log(`The first word of the most funded game is: ${firstWordMostFunded}`);
console.log(`The first word of the second most funded game is: ${firstWordSecondMostFunded}`);