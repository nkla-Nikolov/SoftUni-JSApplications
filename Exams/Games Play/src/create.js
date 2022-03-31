import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

function createTemplate() {
    return html`
    <section id="create-page" class="auth">
        <form id="create" @submit=${createHandler}>
            <div class="container">
    
                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
    </section>
    `;
}

async function createHandler(e){
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let title = form.get('title');
    let category = form.get('category');
    let maxLevel = form.get('maxLevel');
    let imageUrl = form.get('imageUrl');
    let summary = form.get('summary');

    if(!title || !category || !maxLevel || !imageUrl || !summary){
        alert('Please fill all required fields!');
        return;
    }

    try {
        let response = await fetch('http://localhost:3030/data/games', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify({title, category, maxLevel, imageUrl, summary})
        });

        let result = await response.json();

        if(!response.ok){
            throw new Error(result.message);
        }
        else{
            page.redirect('/');
        }


    } catch (error) {
        alert(error);   
    }
}

export function createPage(){
    render(createTemplate(), document.querySelector('#main-content'));
}