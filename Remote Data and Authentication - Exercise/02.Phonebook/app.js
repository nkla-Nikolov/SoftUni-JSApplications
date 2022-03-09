function attachEvents() {
    const loadButton = document.querySelector('#btnLoad');
    let createButton = document.querySelector('#btnCreate');
    let phoneBookElement = document.querySelector('#phonebook');
    let inputPerson = document.querySelector('#person');
    let inputPhone = document.querySelector('#phone');

    let url = 'http://localhost:3030/jsonstore/phonebook';

    loadButton.addEventListener('click', () => {
        phoneBookElement.innerHTML = '';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                renderPeople(data);
        });
    });

    createButton.addEventListener('click', () => {
        if(!inputPerson.value || !inputPhone.value){
            alert('Invalid input!');
            return;
        }

        let data = {
            person: inputPerson.value,
            phone: inputPhone.value
        };

        fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify(data)
        });
        loadButton.click();

        inputPerson.value = '';
        inputPhone.value = '';
    });

    function renderPeople(data){
        Object.values(data).forEach(p => {
            let li = document.createElement('li');
            li.textContent = `${p.person}: ${p.phone}`;
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.id = p._id;

            deleteBtn.addEventListener('click', (e) => {
                fetch(url + '/' + deleteBtn.id, {
                    method: 'delete'
                });

                e.currentTarget.parentNode.remove();
            });

            li.appendChild(deleteBtn);
            phoneBookElement.appendChild(li);
        });
    };
}

attachEvents();