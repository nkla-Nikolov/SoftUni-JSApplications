import { html, render } from '../node_modules/lit-html/lit-html.js'

function dashboardTemplate(animals) {
    return html`
    <section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
    
            ${animals.length > 0 ? animals.map(x => animalTemplate(x)) : html`<div>
                <p class="no-pets">No pets in dashboard</p>
            </div>`}
    
        </div>
    </section>
    `;
}

function animalTemplate(animal) {
    return html`
    <div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src="${animal.image}">
        </article>
        <h2 class="name">${animal.name}</h2>
        <h3 class="breed">${animal.breed}</h3>
        <div class="action">
            <a class="btn" href="/details/${animal._id}">Details</a>
        </div>
    </div>
    `;
}

export async function getAllPets(){
    let response = await fetch('http://localhost:3030/data/pets?sortBy=_createdOn%20desc&distinct=name');
    let result = await response.json();

    return result;
}

export async function getPetById(id){
    let response = await fetch(`http://localhost:3030/data/pets/${id}`);
    let result = await response.json();

    return result;
}


export async function dashboardPage(){
    let animals = await getAllPets();
    render(dashboardTemplate(animals), document.querySelector('#content'));
}