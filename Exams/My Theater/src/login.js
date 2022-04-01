import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { updateNav } from './updateNav.js';

function loginTemplate() {
    return html`
    <section id="loginaPage">
        <form class="loginForm" @submit=${loginHandler}>
            <h2>Login</h2>
            <div>
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
            <div>
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
    
            <button class="btn" type="submit">Login</button>
    
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </form>
    </section>
    `;
}

async function loginHandler(e) {
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let email = form.get('email');
    let password = form.get('password');

    if (!email || !password) {
        alert('Please fill required fields!');
        return;
    }

    try {
        let response = await fetch('http://localhost:3030/users/login', {
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

        sessionStorage.setItem('token', result.accessToken);
        sessionStorage.setItem('email', result.email);
        sessionStorage.setItem('id', result._id);
        updateNav();
        page.redirect('/');
    } catch (error) {
        alert(error);
    }
}

export function loginPage() {
    render(loginTemplate(), document.querySelector('#content'));
}