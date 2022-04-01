import page from '../node_modules/page/page.mjs';

export async function likeEvent(ctx){
    let theaterId = ctx.params.id;

    let response = await fetch(`http://localhost:3030/data/likes`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify({theaterId})
    });
   
    page.redirect(`/details/${theaterId}`)
}


export async function getLikes(id){
    let response = await fetch(`http://localhost:3030/data/likes?where=theaterId%3D%22${id}%22&distinct=_ownerId&count`);
    let result = await response.json();

    return result;
}

export async function isLiked(theaterId, userId){
    let response = await fetch(`http://localhost:3030/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    let result = await response.json();

    return result;
}