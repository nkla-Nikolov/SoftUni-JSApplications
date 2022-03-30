import { html, render, nothing } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

function catalogTemplate(albums) {
    return html`
    <section id="catalogPage">
        <h1>All Albums</h1>

        ${albums.length > 0 ? albums.map(x => singleCatalogTemplate(x)) : html`<p>No Albums in Catalog!</p>`}
        
    </section>
    `;
}

function singleCatalogTemplate(album) {
    return html`
    <div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            <div class="btn-group">
                ${sessionStorage.token ? html`<a href="/details/${album._id}" id="details">Details</a>` : nothing}
            </div>
        </div>
    </div>
    `;
}

export async function catalogPage(){
    let albums = Object.values(await loadAlbums());
    render(catalogTemplate(albums), document.querySelector('#main-content'));
}

export async function loadAlbums(){
    try {
        let response = await fetch(`http://localhost:3030/data/albums?sortBy=_createdOn%20desc&distinct=name`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });

        let result = await response.json();

        if(!response.ok){
            throw new Error(result.message);
        }
        
        return result;
    } catch (error) {
        alert(error);
    }
}