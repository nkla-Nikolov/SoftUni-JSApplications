import page from '../node_modules/page/page.mjs';

export async function deletePet(ctx){
    let id = ctx.params.id;

    try {
        let response = await fetch(`http://localhost:3030/data/pets/${id}`, {
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

        page.redirect(`/`);

    } catch (error) {
        alert(error);
    }
}