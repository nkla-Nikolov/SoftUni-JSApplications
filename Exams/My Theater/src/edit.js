import { html, render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs';
import { getEventById } from './home.js';

function editTemplate(event) { 
    return html`
    <section id="editPage">
        <form class="theater-form" eventID=${event._id} @submit=${editHandler}>
            <h1>Edit Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" value="${event.title}">
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year" value="${event.date}">
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author" value="${event.author}">
            </div>
            <div>
                <label for="description">Theater Description:</label>
                <textarea id="description" name="description"
                    placeholder="Description">${event.description}</textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                    value="${event.imageUrl}">
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>
    `;
}

async function editHandler(e){
    e.preventDefault();
    let id = e.target.getAttribute('eventID');

    let form = new FormData(e.currentTarget);

    let title = form.get('title');
    let date = form.get('date');
    let author = form.get('author');
    let description = form.get('description');
    let imageUrl = form.get('imageUrl');

    if(!title || !date || !author || !description || !imageUrl){
        alert('Please fill all required fields');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3030/data/theaters/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify({title, date, author, description, imageUrl})
        });

        if(!response.ok){
            throw new Error(Error);
        }

        page.redirect(`/details/${id}`);
        
    } catch (error) {
        alert(error);
    }
}

export async function editPage(ctx){
    let event = await getEventById(ctx.params.id);
    render(editTemplate(event), document.querySelector('#content'));
}