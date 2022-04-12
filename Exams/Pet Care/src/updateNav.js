let liElements = Array.from(document.querySelectorAll('nav li'));
let guestView = liElements.slice(2, 4);
let userView = liElements.slice(4, 6);

export function updateNav(){
    if(sessionStorage.token){
        userView.forEach(x => x.style.display = 'block');
        guestView.forEach(x => x.style.display = 'none');
    }
    else{
        userView.forEach(x => x.style.display = 'none');
        guestView.forEach(x => x.style.display = 'block');
    }
}