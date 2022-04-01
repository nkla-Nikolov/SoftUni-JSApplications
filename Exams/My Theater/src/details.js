import { html, render, nothing } from '../node_modules/lit-html/lit-html.js';
import { getEventById } from './home.js';
import { getLikes, isLiked } from './like.js';

function detailsTemplate(event, likesCount, hasLiked) {
    return html`
    <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${event.title}</h1>
                <div>
                    <img src="${event.imageUrl}" />
                </div>
            </div>
    
            <div class="details">
                <h3>Theater Description</h3>
                <p>${event.description}</p>
                <h4>Date: ${event.date}</h4>
                <h4>Author: ${event.author}</h4>

                ${sessionStorage.id == event._ownerId ? html`<div class="buttons">
                    <a class="btn-delete" href="/delete/${event._id}">Delete</a>
                    <a class="btn-edit" href="/edit/${event._id}">Edit</a>
                </div>` : nothing}
                
                ${sessionStorage.id !== event._ownerId && sessionStorage.token && !hasLiked? html`<a class="btn-like" href="/like/${event._id}">Like</a>` : nothing}
                <p class="likes">Likes: ${likesCount}</p>
            </div>
        </div>
    </section>
    `;
}

export async function detailsPage(ctx){
    let event = await getEventById(ctx.params.id);
    let likesCount = await getLikes(ctx.params.id);
    let hasLiked = await isLiked(ctx.params.id, sessionStorage.id);
    
    render(detailsTemplate(event, likesCount, hasLiked), document.querySelector('#content'));
}