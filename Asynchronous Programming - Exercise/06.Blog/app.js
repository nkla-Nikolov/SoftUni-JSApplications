function attachEvents() {
    let url = 'http://localhost:3030/jsonstore/blog/posts';
    let posts = document.querySelector('#posts');
    let commentsElement = document.querySelector('#post-comments');
    let viewButton = document.querySelector('#btnViewPost');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            Object.values(data).forEach(p => {
                let optionElement = document.createElement('option');
                optionElement.value = p.id;
                optionElement.textContent = p.title;
                posts.appendChild(optionElement);
            });
        })
        .catch(err => console.log(err));

    viewButton.addEventListener('click', (e) => {
        let selected = Array.from(e.currentTarget.parentNode.children[2]).find(x => x.selected);

        url = `http://localhost:3030/jsonstore/blog/comments/`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let comments = Object.values(data).filter(x => x.postId == selected.value);
                commentsElement.innerHTML = '';
                
                comments.forEach(x => {
                    let li = document.createElement('li');
                    li.textContent = x.text;
                    commentsElement.appendChild(li);
                });
            });
    });       
}
attachEvents();