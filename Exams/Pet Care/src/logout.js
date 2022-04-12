import { updateNav } from "./updateNav.js";
import page from '../node_modules/page/page.mjs';

export async function logout(){
    try {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            }
        });

        if(!response.ok){
            throw new Error('Error in logging in!');
        }

        sessionStorage.clear();
        updateNav();
        page.redirect('/');

    } catch (error) {
        alert(error);
    }
}