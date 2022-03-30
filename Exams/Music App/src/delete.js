import page from '../node_modules/page/page.mjs';

export async function deleteAlbum(ctx){
    let id = ctx.params.id;
    let confirmed = confirm('Are you sure you want to delete this album?');
    
    if(confirmed){
        try {
            let response = await fetch(`http://localhost:3030/data/albums/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('token')
                }
            });
            
            if(response.ok){
                page.redirect('/catalog');
            }
            else{
                throw new Error(response.json().message);
            }
        } catch (error) {
            alert(error);
        }
    }
}