import page from '../node_modules/page/page.mjs';
import { updateNav } from './updateNav.js';

export async function logout(){
    try {
        let response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            }
        });

        if(!response.ok){
            throw new Error('Error in logging out! Please try again.');
        }

        sessionStorage.clear();
        updateNav();
        page.redirect('/');

    } catch (error) {
        alert(error);
    }
}