function attachEvents() {
    let url = 'http://localhost:3030/jsonstore/forecaster/locations';
    let locationCode = document.querySelector('#location');
    let forecastElement = document.querySelector('#forecast');
    let currentElement = document.querySelector('#current');
    let upcomingElement = document.querySelector('#upcoming');
    let getWeatherButton = document.querySelector('#submit');

    let conditions = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    };

    getWeatherButton.addEventListener('click', () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                try {
                    let code = Object.values(data).find(x => x.code == locationCode.value);
                
                    if(typeof code == undefined){
                        throw new Error;
                    }

                    forecastElement.style.display = 'block';

                    let todaysURL = `http://localhost:3030/jsonstore/forecaster/today/${code.code}`;
                    let upcomingURL = `http://localhost:3030/jsonstore/forecaster/upcoming/${code.code}`;

                    fetch(todaysURL)
                        .then(response => response.json())
                        .then(city => {
                            let info = Object.values(city);
                            let name = info[1];
                            let {condition, high, low} = info[0];

                            let currentDiv = document.createElement('div');
                            currentDiv.classList.add('forecasts');

                            let symbolSpan = document.createElement('span');
                            symbolSpan.classList.add('condition', 'symbol');
                            symbolSpan.textContent = conditions[condition];

                            let spanCityInfo = document.createElement('span');
                            spanCityInfo.classList.add('condition');

                            let spanCityName = document.createElement('span');
                            spanCityName.classList.add('forecast-data');
                            spanCityName.textContent = name;
                            spanCityInfo.appendChild(spanCityName);

                            let spanCityDegrees = document.createElement('span');
                            spanCityDegrees.classList.add('forecast-data');
                            spanCityDegrees.textContent = `${low}${conditions.Degrees}/${high}${conditions.Degrees}`;
                            spanCityInfo.appendChild(spanCityDegrees);

                            let spanCityCondition = document.createElement('span');
                            spanCityCondition.classList.add('forecast-data');
                            spanCityCondition.textContent = condition;
                            spanCityInfo.appendChild(spanCityCondition);

                            currentDiv.appendChild(symbolSpan);
                            currentDiv.appendChild(spanCityInfo);
                            currentElement.appendChild(currentDiv);
                        });

                    fetch(upcomingURL)
                        .then(response => response.json())
                        .then(data => {
                            let info = Object.values(data).reverse().pop();
                            let upconmingDiv = document.createElement('div');
                            upconmingDiv.classList.add('forecast-info');
                            
                            info.forEach(x => {
                                let {condition, high, low} = x;
                                
                                let daySpan = document.createElement('span');
                                daySpan.classList.add('upcoming');

                                let symbolSpan = document.createElement('span');
                                symbolSpan.classList.add('symbol')
                                symbolSpan.textContent = conditions[condition];

                                let degreesSpan = document.createElement('span');
                                degreesSpan.classList.add('forecast-data');
                                degreesSpan.textContent = `${low}${conditions.Degrees}/${high}${conditions.Degrees}`;

                                let conditionSpan = document.createElement('span');
                                conditionSpan.classList.add('forecast-data');
                                conditionSpan.textContent = condition;

                                daySpan.appendChild(symbolSpan);
                                daySpan.appendChild(degreesSpan);
                                daySpan.appendChild(conditionSpan);

                                upconmingDiv.appendChild(daySpan);
                            });

                            upcomingElement.appendChild(upconmingDiv);
                        });

                    locationCode.value = '';
                }
                catch (err) {
                    locationCode.value = 'Error';
                }
                 
            });
    });
};

attachEvents();