import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import { getPetById } from './dashboard.js';
import { getDonations, hasDonated } from './donate.js';

function detailsTemplate(animal, totalDonations, isDonated) {
    return html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src="${animal.image}">
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${animal.name}</h1>
                    <h3>Breed: ${animal.breed}</h3>
                    <h4>Age: ${animal.age}</h4>
                    <h4>Weight: ${animal.weight}</h4>
                    <h4 class="donation">Donation: ${totalDonations}$</h4>
                </div>
                <!-- if there is no registered user, do not display div-->
                <div class="actionBtn">
                    <!-- Only for registered user and creator of the pets-->

                    ${sessionStorage.id == animal._ownerId ? html`<a href="/edit/${animal._id}" class="edit">Edit</a>
                    <a href="/delete/${animal._id}" class="remove">Delete</a>` : nothing}
                    
                    <!--(Bonus Part) Only for no creator and user-->
                    ${sessionStorage.id && sessionStorage.id != animal._ownerId  && !isDonated? html`<a href="/donate/${animal._id}" class="donate">Donate</a>` : nothing}
                </div>
            </div>
        </div>
    </section>
    `;
}

export async function detailsPage(ctx){
    let id = ctx.params.id;
    let animal = await getPetById(id);
    let totalDonations = await getDonations(id);
    let isDonated = await hasDonated(id, sessionStorage.id);

    render(detailsTemplate(animal, totalDonations, isDonated), document.querySelector('#content'));
}