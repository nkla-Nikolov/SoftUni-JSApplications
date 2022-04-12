import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs';
import { getPetById } from './dashboard.js';

function editTemplate(animal) {
    return html`
    <section id="editPage">
        <form class="editForm" petID=${animal._id} @submit=${editHandler}>
            <img src="${animal.image}">
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" value="${animal.name}">
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" value="${animal.breed}">
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" value="${animal.age}">
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" value="${animal.weight}">
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" value="${animal.image}">
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
        </form>
    </section>
    `;
}

async function editHandler(e){
    e.preventDefault();
    let id = e.target.getAttribute('petID');
    
    let form = new FormData(e.currentTarget);

    let name = form.get('name');
    let breed = form.get('breed');
    let age = form.get('age');
    let weight = form.get('weight');
    let image = form.get('image');

    if(!name || !breed || !age || !weight || !image){
        alert('Please fill all required fields!');
        return;
    }

    try {
        let response = await fetch(`http://localhost:3030/data/pets/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify({name, breed, age, weight, image})
        });

        if(!response.ok){
            throw new Error('Error in editing!');
        }

        page.redirect(`/details/${id}`);

    } catch (error) {
        alert(error);
    }
}

export async function editPage(ctx){
    let animal = await getPetById(ctx.params.id);
    render(editTemplate(animal), document.querySelector('#content'));
}