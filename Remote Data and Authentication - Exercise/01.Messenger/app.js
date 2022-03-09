function attachEvents() {
    let nameElement = document.querySelector('input[name="author"]');
    let messageElement = document.querySelector('input[name="content"]');
    let textAreaElement = document.getElementsByTagName('textarea')[0];
    let submitButton = document.querySelector('#submit');
    let refreshButton = document.querySelector('#refresh');
    let url = 'http://localhost:3030/jsonstore/messenger';

    submitButton.addEventListener('click', () => {

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify({
                author: nameElement.value,
                content: messageElement.value
            })
        });
    });

    refreshButton.addEventListener('click', (e) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                Object.values(data).forEach(m => {
                    textAreaElement.value += `${m.author}: ${m.content}` + '\n';
                });
            });
    });
}

attachEvents();