import page from '../node_modules/page/page.mjs';

export async function deleteEvent (ctx){
    try {
        const response = await fetch(`http://localhost:3030/data/theaters/${ctx.params.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            }
        });
        let result = await response.json();

        if(!response.ok){
            throw new Error(result.message);
        }

        page.redirect('/profile');
    } catch (error) {
        alert(error);
    }
}