export function updateNav(){
    if(sessionStorage.token){
        document.querySelector('#create-album').style.display = 'inline-block';
        document.querySelector('#logout-nav').style.display = 'inline-block';
        document.querySelector('#login').style.display = 'none';
        document.querySelector('#register').style.display = 'none';
    }
    else{
        document.querySelector('#create-album').style.display = 'none';
        document.querySelector('#logout-nav').style.display = 'none';
        document.querySelector('#login').style.display = 'inline-block';
        document.querySelector('#register').style.display = 'inline-block';
    }
}