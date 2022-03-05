function solve() {
    let currentStop = 'depot';
    let departButton = document.querySelector('#depart');
    let arriveButton = document.querySelector('#arrive');
    let infoElement = document.querySelector('#info .info');

    
    function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${currentStop}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {

                infoElement.textContent = `Next stop ${data.name}`;
                currentStop = data.next;

                departButton.disabled = true;
                arriveButton.disabled = false;
            })
            .catch(
                infoElement.textContent = 'Error',
                departButton.disabled = true,
                arriveButton.disabled = true
            );
    };

    function arrive() {
        departButton.disabled = false;
        arriveButton.disabled = true;
        
        let arr = infoElement.textContent.split(' ').slice(2);
        let busStop = '';

        for (let i = 0; i < arr.length; i++) {
            busStop += arr[i] + ' ';
        }

        infoElement.textContent = `Arriving at ${busStop}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();