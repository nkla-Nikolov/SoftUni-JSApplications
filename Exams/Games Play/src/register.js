import { html, render } from '../node_modules/lit-html/lit-html.js';
import { updateNav } from './updateNav.js';
import page from '../node_modules/page/page.mjs';

function registerTemplate() {
    return html`
    <section id="register-page" class="content auth">
        <form id="register" @submit=${registerHandler}>
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>
    
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">
    
                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">
    
                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">
    
                <input class="btn submit" type="submit" value="Register">
    
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>
    `;
}

async function registerHandler(e){
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let email = form.get('email');
    let password = form.get('password');
    let rePass = form.get('confirm-password');

    if(password != rePass){
        alert('Password does not match!');
        return;
    }

    if(!password || !email){
        alert('Please fill all required fields!');
        return;
    }

    try {
        let response = await fetch('http://localhost:3030/users/register', {
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

export function registerPage(){
    render(registerTemplate(), document.querySelector('#main-content'));
}