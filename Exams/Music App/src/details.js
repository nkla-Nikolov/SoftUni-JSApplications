import { html, render, nothing } from '../node_modules/lit-html/lit-html.js';

function detailsTemplate(album) {
    return html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src="${album.imgUrl}">
            </div>
            <div class="albumInfo">
                <div class="albumText">
    
                    <h1>Name: ${album.name}</h1>
                    <h3>Artist: ${album.artist}</h3>
                    <h4>Genre: ${album.genre}</h4>
                    <h4>Price: $${album.price}</h4>
                    <h4>Date: ${album.releaseDate}</h4>
                    <p>Description: ${album.description}</p>
                </div>
    
                ${album._ownerId == sessionStorage.id ? html`<div class="actionBtn">
                    <a href="/edit/${album._id}" class="edit">Edit</a>
                    <a href="/delete/${album._id}" class="remove">Delete</a>
                </div>` : nothing}
            </div>
        </div>
    </section>
    `;
}

export async function detailsPage(ctx){
    let id = ctx.params.id;
    let album = await getAlbumById(id);
    
    render(detailsTemplate(album), document.querySelector('#main-content'));
}

export async function getAlbumById(id){
    try {
        let response = await fetch(`http://localhost:3030/data/albums/${id}`);
        let result = await response.json();

        if(!response.ok){
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        alert(error);
    }
}
