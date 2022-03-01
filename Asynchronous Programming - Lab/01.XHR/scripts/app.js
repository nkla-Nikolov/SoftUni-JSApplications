function loadRepos() {
   let baseUrl = 'https://api.github.com/users/testnakov/repos';
   let divElement = document.querySelector('#res');

   let request = new XMLHttpRequest();
   request.open('GET', baseUrl, true);

   request.addEventListener('readystatechange', () => {
      if(request.readyState == 4){
         divElement.textContent = request.responseText;
      }
   });

   request.send();
}