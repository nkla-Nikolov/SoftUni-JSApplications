import { html, render } from '../node_modules/lit-html/lit-html.js';
import { updateNav } from './updateNav.js';
import page from '../node_modules/page/page.mjs';

function registerTemplate() {
    return html`
    <section id="registerPage">
        <form @submit=${registerHandler}>
            <fieldset>
                <legend>Register</legend>
    
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">
    
                <button type="submit" class="register">Register</button>
    
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
    `;
}

async function registerHandler(e){
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let email = form.get('email');
    let password = form.get('password');
    let rePass = form.get('conf-pass');

    if(!email || !password || !rePass){
        alert('Please fill all required fields!');
        return;
    }

    if(password !== rePass){
        alert('Password does not match!');
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

        sessionStorage.setItem('email', result.email);
        sessionStorage.setItem('token', result.accessToken);
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