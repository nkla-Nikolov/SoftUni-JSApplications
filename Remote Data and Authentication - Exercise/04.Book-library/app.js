let loadBooksURL = 'http://localhost:3030/jsonstore/collections/books';
let deleteBookURL = `http://localhost:3030/jsonstore/collections/books/`

let bookSection = document.getElementsByTagName('tbody')[0];
const loadBooksButton = document.querySelector('#loadBooks');
const submitButton = document.getElementsByTagName('form')[0].children[5];

loadBooksButton.addEventListener('click', (e) => {
    e.preventDefault();
    bookSection.innerHTML = '';

    fetch(loadBooksURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error('Error');
        })
        .then(books => {
            Object.values(books).forEach(book => createBook(book));
        })
        .catch(err => alert('Error with server'));
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    submitButton.textContent = 'Submit';
    document.querySelector('form h3').textContent = 'FORM';

    let form = new FormData(document.querySelector('#form'));
    let author = form.get('author');
    let title = form.get('title');

    if (!author || !title) {
        alert('Invalid input');
        return;
    }

    fetch(loadBooksURL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application-json'
        },
        body: JSON.stringify({
            author,
            title
        })
    });

    Array.from(document.getElementsByTagName('input')).forEach(x => x.value = '');
    loadBooksButton.click();
});

function createBook(book) {
    let row = document.createElement('tr');
    row.id = book._id;

    let tdTitle = document.createElement('td');
    let tdAuthor = document.createElement('td');
    let tdActions = document.createElement('td');
    let editBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

    tdTitle.textContent = book.title;
    tdAuthor.textContent = book.author;

    editBtn.textContent = 'Edit';
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        fetch(`${deleteBookURL}${e.currentTarget.parentNode.parentNode.id}`, {
            method: 'DELETE'
        });

        e.currentTarget.parentNode.parentNode.remove();
    });

    editBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let form = Array.from(document.getElementsByTagName('input'));
        document.querySelector('form h3').textContent = 'Edit FORM';
        let bookName = e.currentTarget.parentNode.parentNode.children[0].textContent;
        let author = e.currentTarget.parentNode.parentNode.children[1].textContent;
        submitButton.textContent = 'Save';

        form[0].value = bookName;
        form[1].value = author;

        e.currentTarget.parentNode.parentNode.remove();
        
        fetch(`${deleteBookURL}${e.currentTarget.parentNode.parentNode.id}`, {
            method: 'DELETE'
        });
    });

    tdActions.appendChild(editBtn);
    tdActions.appendChild(deleteBtn);

    row.appendChild(tdTitle);
    row.appendChild(tdAuthor);
    row.appendChild(tdActions);
    bookSection.appendChild(row);
};