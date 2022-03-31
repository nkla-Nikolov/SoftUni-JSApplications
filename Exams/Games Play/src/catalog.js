import { html, render } from '../node_modules/lit-html/lit-html.js';

function catalogTemplate(games) {
    return html`
    <section id="catalog-page">
        <h1>All Games</h1>
        
        ${games.length > 0 ? games.map(x => singleGameTemplate(x)) : html`<h3 class="no-articles">No articles yet</h3>`}
        
    </section>
    `;
}

function singleGameTemplate(game) {
    return html`
    <div class="allGames">
        <div class="allGames-info">
            <img src="${game.imageUrl}">
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/details/${game._id}" class="details-button">Details</a>
        </div>
    </div>
    `;
}

export async function catalogPage(){
    let games = await getAllGames();
    render(catalogTemplate(games), document.querySelector('#main-content'));
}

export async function getAllGames(){
    try {
        let response = await fetch('http://localhost:3030/data/games?sortBy=_createdOn%20desc');
        
        let result = await response.json();

        if(!response.ok){
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        alert(error);
    }
}