import { html, render } from '../node_modules/lit-html/lit-html.js';

function homeTemplate(games) {
    return html`
    <section id="welcome-world">
    
        <div class="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero">
    
        <div id="home-page">
            <h1>Latest Games</h1>
    
            ${games.length > 0 ? games.map(x => singleGameTemplate(x)) : html`<p class="no-articles">No games yet</p>`}
            
        </div>
    </section>
    `;
}

function singleGameTemplate(game) {
    return html`
    <div class="game">
        <div class="image-wrap">
            <img src="${game.imageUrl}">
        </div>
        <h3>${game.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${game._id}" class="btn details-btn">Details</a>
        </div>
    </div>
    `;
}

async function getMostRecentGames() {
    try {
        let response = await fetch('http://localhost:3030/data/games?sortBy=_createdOn%20desc&distinct=category');
        let result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        alert(error);
    }
}

export async function homePage() {
    let games = await getMostRecentGames();
    render(homeTemplate(games), document.querySelector('#main-content'));
}

