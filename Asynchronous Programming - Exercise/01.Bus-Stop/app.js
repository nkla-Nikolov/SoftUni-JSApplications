function getInfo() {
    let stopIdElement = document.querySelector('#stopId').value;
    let stopNameElement = document.querySelector('#stopName');
    let busesElement = document.querySelector('#buses');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopIdElement}`;

    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }

        throw response;
    })
    .then(data => {
        stopNameElement.textContent = data.name;
        
        Object.keys(data.buses).forEach(b => {
            let li = document.createElement('li');
            li.textContent = `Bus ${b} arrives in ${data.buses[b]} minutes`
            busesElement.appendChild(li);
        });
    })
    .catch(
        stopNameElement.textContent = 'Error'
    );
}