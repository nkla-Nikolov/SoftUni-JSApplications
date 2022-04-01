let liElements = Array.from(document.querySelectorAll('nav li'));
let userView = liElements.slice(0, 3);
let guestView = liElements.slice(3, 5);

export function updateNav(){
    if(sessionStorage.token){
        userView.forEach(x => x.style.display = 'inline-block');
        guestView.forEach(x => x.style.display = 'none');
    }
    else{
        userView.forEach(x => x.style.display = 'none');
        guestView.forEach(x => x.style.display = 'inline-block');
    }
}
