import { html, render } from '../node_modules/lit-html/lit-html.js';
import { updateNav } from './updateNav.js';
import page from '../node_modules/page/page.mjs';

function loginTemplate() {
    return html`
    <section id="login-page" class="auth">
        <form id="login" @submit=${loginHandler}>
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">
    
                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password">
                <input type="submit" class="btn submit" value="Login">
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </div>
        </form>
    </section>
    `;
}

async function loginHandler(e){
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let email = form.get('email');
    let password = form.get('password');

    if(!email || !password){
        alert('Please fill all required fields!');
        return;
    }

    try {
        let response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        let result = await response.json();

        if(!response.ok){
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

export function loginPage(){
    render(loginTemplate(), document.querySelector('#main-content'));
}