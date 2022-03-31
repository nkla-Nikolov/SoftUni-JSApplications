import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { getGameById } from './details.js';

function editTemplate(game) {
    return html`
    <section id="edit-page" class="auth">
        <form id="edit" gameID=${game._id} @submit=${editHandler}>
            <div class="container">
    
                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" value="${game.title}">
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" value="${game.category}">
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" value="${game.maxLevel}">
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" value="${game.imageUrl}">
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary">${game.summary}</textarea>
                <input class="btn submit" type="submit" value="Edit Game">
    
            </div>
        </form>
    </section>
    `;
}

async function editHandler(e) {
    e.preventDefault();

    let form = new FormData(e.currentTarget);
    let id = e.target.getAttribute('gameID');

    let title = form.get('title');
    let category = form.get('category');
    let maxLevel = form.get('maxLevel');
    let imageUrl = form.get('imageUrl');
    let summary = form.get('summary');

    if (!title || !category || !maxLevel || !imageUrl || !summary) {
        alert('Please fill all required fields!');
        return;
    }

    try {
        let response = await fetch(`http://localhost:3030/data/games/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify({ title, category, maxLevel, imageUrl, summary })
        });

        let result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        page.redirect(`/details/${id}`);
    } catch (error) {
        alert(error);
    }
}

export async function editPage(ctx) {
    let game = await getGameById(ctx.params.id);
    render(editTemplate(game), document.querySelector('#main-content'));
}