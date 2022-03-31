export async function deleteGame(ctx) {
    let id = ctx.params.id;

    let confirmed = confirm('Are you sure you want to delete this game?');

    if (confirmed) {

        let response = await fetch(`http://localhost:3030/data/games/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            }
        });

        ctx.page.redirect('/');
    }   
}