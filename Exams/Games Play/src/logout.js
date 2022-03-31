import { updateNav } from "./updateNav.js";
import page from '../node_modules/page/page.mjs';

export async function logout(){
    try {
        let response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': sessionStorage.getItem('token')
            }
        });

        if(!response.ok){
            throw new Error('Error in logging out');
        }
        else{
            sessionStorage.clear();
            updateNav();   
            page.redirect('/');
        }

    } catch (error) {
        alert(error);
    }
}