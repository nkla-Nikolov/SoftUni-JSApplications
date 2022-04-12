import page from '../node_modules/page/page.mjs';

export async function donate(ctx) {
    let petId = ctx.params.id;

    try {
        let response = await fetch('http://localhost:3030/data/donation', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify({ petId })
        });

        if (!response.ok) {
            throw new Error('Error');
        }

        page.redirect(`/details/${petId}`);

    } catch (error) {
        alert(error);
    }
}

export async function getDonations(petId) {
    let response = await fetch(`http://localhost:3030/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
    let result = await response.json();

    return result * 100;
}

export async function hasDonated(petId, userId) {
    let response = await fetch(`http://localhost:3030/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    let result = await response.json();

    return result;
}