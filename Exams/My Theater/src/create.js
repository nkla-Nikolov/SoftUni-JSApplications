import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

function createTemplate() {
    return html`
    <section id="createPage">
        <form class="create-form" @submit=${createHandler}>
            <h1>Create Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" value="">
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year">
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author">
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" name="description" placeholder="Description"></textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>
    `;
}

async function createHandler(e) {
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let title = form.get('title');
    let date = form.get('date');
    let author = form.get('author');
    let description = form.get('description');
    let imageUrl = form.get('imageUrl');

    if(!title || !date || !author || !description || !imageUrl){
        alert('All fields are required!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/data/theaters', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify({title, date, author, description, imageUrl})
        });

        let result = await response.json();

        if(!response.ok){
            throw new Error(result.message);
        }

        page.redirect('/');

    } catch (error) {
        
    }
}

export function createPage(){
    render(createTemplate(), document.querySelector('#content'));
}