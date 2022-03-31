import { html, render, nothing } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

function detailsTemplate(game, comments) {
    return html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src="${game.imageUrl}" />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
    
            <p class="text">
                ${game.summary}
            </p>
    
            <div class="details-comments">
                <h2>Comments:</h2>
                <ul>
                    ${comments.length > 0 ? comments.map(x => commentTemplate(x)) : html`<p class="no-comment">No comments.
                    </p>`}
                </ul>
            </div>
    
            ${sessionStorage.id == game._ownerId ? html`<div class="buttons">
                <a href="/edit/${game._id}" class="button">Edit</a>
                <a href="/delete/${game._id}" class="button">Delete</a>
            </div>` : nothing}
        </div>
    
        ${sessionStorage.id != game._ownerId && sessionStorage.token != undefined ? html`<article class="create-comment">
            <label>Add new comment:</label>
            <form class="form" gameID=${game._id} @submit=${commentHandler}>
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>` : nothing}
    
    
    </section>
    `;
}

function commentTemplate(comment) {
    return html`
    <li class="comment">
        <p>Content: ${comment.comment}</p>
    </li>
    `;
}

async function commentHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let gameId = e.target.getAttribute('gameID');
    let form = document.querySelector('.form');

    let comment = formData.get('comment');

    try {
        let response = await fetch('http://localhost:3030/data/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify({ gameId, comment })
        });

        if(!response.ok){
            throw new Error('Error in posting comment!');
        }

    } catch (error) {
        alert(error);
    }

    form.reset();
    
    page.redirect(`/details/${gameId}`);
}

export async function getGameById(id) {
    try {
        let response = await fetch(`http://localhost:3030/data/games/${id}`);
        let result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        alert(error);
    }
}

async function getComments(id) {
    try {
        let response = await fetch(`http://localhost:3030/data/comments?where=gameId%3D%22${id}%22`);
        let result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }
        
        return result;
    } catch (error) {
        alert(error);
    }
}

export async function detailsPage(ctx) {
    let game = await getGameById(ctx.params.id);
    let comments = Object.values(await getComments(ctx.params.id));
    render(detailsTemplate(game, comments), document.querySelector('#main-content'));
}
