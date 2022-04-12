import { html, render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs';
import { updateNav } from './updateNav.js';

function registerTemplate() {
    return html`
    <section id="registerPage">
        <form class="registerForm" @submit=${registerHandler}>
            <img src="./images/logo.png" alt="logo" />
            <h2>Register</h2>
            <div class="on-dark">
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
    
            <div class="on-dark">
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
    
            <div class="on-dark">
                <label for="repeatPassword">Repeat Password:</label>
                <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
            </div>
    
            <button class="btn" type="submit">Register</button>
    
            <p class="field">
                <span>If you have profile click <a href="/login">here</a></span>
            </p>
        </form>
    </section>
    `;
}

async function registerHandler(e){
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let email = form.get('email');
    let password = form.get('password');
    let repeatPassword = form.get('repeatPassword');

    if(password != repeatPassword){
        alert('Password does not match!');
        return;
    }

    if(!email || !password){
        alert('Please fill all requred fields!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3030/users/register`, {
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
        sessionStorage.setItem('id', result._id);
        sessionStorage.setItem('email', result.email);
        updateNav();
        page.redirect('/');

    } catch (error) {
        alert(error);
    }
}

export function registerPage(){
    render(registerTemplate(), document.querySelector('#content'));
}