function loadCommits() {
    let username = document.querySelector('#username').value;
    let repo = document.querySelector('#repo').value;
    let ulRepo = document.querySelector('#commits');

    let  url =  `https://api.github.com/repos/${username}/${repo}/commits`;

    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        
        throw response;
    })
    .then(data => {
        
        Object.values(data).forEach(repo => {
            let li = document.createElement('li');
            li.textContent = `${repo.commit.author.name}: ${repo.commit.message}`;
            ulRepo.appendChild(li);
        });
    })
    .catch(err => {
        let errorLi = document.createElement('li');
        errorLi.textContent = `Error: ${err.status} (Not Found)`;
        ulRepo.appendChild(errorLi);
    });
}