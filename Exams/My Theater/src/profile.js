import { html, render } from '../node_modules/lit-html/lit-html.js';

function profileTemplate(events) {
    return html`
    <section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${sessionStorage.email}</h2>
        </div>
        <div class="board">
    
            ${events.length > 0 ? events.map(x => eventTemplate(x)) : html`<div class="no-events">
                <p>This user has no events yet!</p>
            </div>`}
    
        </div>
    </section>
    `;
}

function eventTemplate(event) {
    return html`
    <div class="eventBoard">
        <div class="event-info">
            <img src="${event.imageUrl}">
            <h2>${event.title}</h2>
            <h6>${event.date}</h6>
            <a href="/details/${event._id}" class="details-button">Details</a>
        </div>
    </div>
    `;
}


export async function profilePage(){
    let response = await fetch(`http://localhost:3030/data/theaters?where=_ownerId%3D%22${sessionStorage.id}%22&sortBy=_createdOn%20desc`);
    let events = await response.json();
    
    render(profileTemplate(events), document.querySelector('#content'));
}
