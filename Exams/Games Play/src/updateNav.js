let guestView = document.querySelector('#guest');
let userView = document.querySelector('#user');

export function updateNav(){
    if(sessionStorage.token){
        userView.style.display = 'block';
        guestView.style.display = 'none';
    }
    else{
        userView.style.display = 'none';
        guestView.style.displta = 'block';
    }
}