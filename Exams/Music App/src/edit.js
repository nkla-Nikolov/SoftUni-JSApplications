import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { getAlbumById } from './details.js';

function editTemplate(album) {
    return html`
    <section class="editPage">
        <form albumID=${album._id} @submit=${editHandler}>
            <fieldset>
                <legend>Edit Album</legend>
    
                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input id="name" name="name" class="name" type="text" value="${album.name}">
    
                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${album.imgUrl}">
    
                    <label for="price" class="vhide">Price</label>
                    <input id="price" name="price" class="price" type="text" value="${album.price}">
    
                    <label for="releaseDate" class="vhide">Release date</label>
                    <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${album.releaseDate}">
    
                    <label for="artist" class="vhide">Artist</label>
                    <input id="artist" name="artist" class="artist" type="text" value="${album.artist}">
    
                    <label for="genre" class="vhide">Genre</label>
                    <input id="genre" name="genre" class="genre" type="text" value="${album.genre}">
    
                    <label for="description" class="vhide">Description</label>
                    <textarea name="description" class="description" rows="10" cols="10">${album.description}</textarea>
    
                    <button class="edit-album" type="submit">Edit Album</button>
                </div>
            </fieldset>
        </form>
    </section>
    `;
}

async function editHandler(e) {
    e.preventDefault();

    let form = new FormData(e.currentTarget);
    let id = e.target.getAttribute('albumID');

    let name = form.get('name');
    let imgUrl = form.get('imgUrl');
    let price = form.get('price');
    let releaseDate = form.get('releaseDate');
    let artist = form.get('artist');
    let genre = form.get('genre');
    let description = form.get('description');

    if(!name || !imgUrl || !price || !releaseDate || !artist || !genre || !description){
        alert('Please fill all required fields!');
        return;
    }

    try {
        let response = await fetch(`http://localhost:3030/data/albums/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify({name, imgUrl, price, releaseDate, artist, genre, description})
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

export async function editPage(ctx){
    let album = await getAlbumById(ctx.params.id);
    render(editTemplate(album), document.querySelector('#main-content'));
}