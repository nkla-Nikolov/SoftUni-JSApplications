import { html, render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs';

function createTemplate() {
    return html`
    <section id="createPage">
        <form class="createForm" @submit=${createHandler}>
            <img src="./images/cat-create.jpg">
            <div>
                <h2>Create PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" placeholder="Max">
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" placeholder="2 years">
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" placeholder="5kg">
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
                </div>
                <button class="btn" type="submit">Create Pet</button>
            </div>
        </form>
    </section>
    `;
}

async function createHandler(e){
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let name = form.get('name');
    let breed = form.get('breed');
    let age = form.get('age');
    let weight = form.get('weight');
    let image = form.get('image');

    if(!name || !breed || !age || !weight || !image){
        alert('All fields are required!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3030/data/pets`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify({name, breed, age, weight, image})
        });

        let result = await response.json();

        if(!response.ok){
            throw new Error(result.message);
        }

        page.redirect('/');
    } catch (error) {
        alert(error);
    }
}

export function createPage(){
    render(createTemplate(), document.querySelector('#content'));
}