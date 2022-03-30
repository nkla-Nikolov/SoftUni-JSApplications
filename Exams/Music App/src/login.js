import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { updateNav } from './updateNav.js';

function loginTemplate() {
    return html`
    <section id="loginPage">
        <form @submit=${loginHandler}>
            <fieldset>
                <legend>Login</legend>
    
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <button type="submit" class="login">Login</button>
    
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
    `;
}

async function loginHandler(e) {
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let email = form.get('email');
    let password = form.get('password');

    if(!email || !password){
        alert('Please fill the required fields!');
        return;
    }

    try {
        let response = await fetch(`http://localhost:3030/users/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        let result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        sessionStorage.setItem('email', result.email);
        sessionStorage.setItem('token', result.accessToken);
        sessionStorage.setItem('id', result._id);

        updateNav();
        page.redirect('/');

    } catch (error) {
        alert(error);
    }
}

export function loginPage(){
    render(loginTemplate(), document.querySelector('#main-content'));
}