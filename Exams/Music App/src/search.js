import { html, render, nothing } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { loadAlbums } from './catalog.js';

function searchTemplate(albums) {
    return html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list" @click=${searchHandler}>Search</button>
        </div>
    
        <h2>Results:</h2>
    
        <div class="search-result">
    
            ${albums.length > 0 ? albums.map(x => singleAlbumTemplate(x)) : html`<p class="no-result">No result.</p>`}
    
        </div>
    </section>
    `;
}

function singleAlbumTemplate(album) {
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

async function searchHandler(e) {
    e.preventDefault();

    let searchedAlbum = document.querySelector('#search-input').value;

    if (!searchedAlbum) {
        alert('Please enter what are you looking for!');
        return;
    }

    try {
        let response = await fetch(`http://localhost:3030/data/albums?where=name%20LIKE%20%22${searchedAlbum}%22`);
        let result = Object.values(await response.json());

        if (!response.ok) {
            throw new Error(result.message);
        }

        render(searchTemplate(result), document.querySelector('#main-content'));
    } catch (error) {
        alert(error);
    }
}

export function searchPage() {
    render(searchTemplate([]), document.querySelector('#main-content'));
}