window.onload = coockbook;
let mainCollection = document.getElementsByTagName('main');

async function coockbook(){
    let url = 'http://localhost:3030/jsonstore/cookbook/recipes';
    let mainElement = mainCollection[0];
    mainElement.innerHTML = '';
    
    fetch(url)
    .then(response => response.json())
    .then(recipies => {
        Object.values(recipies).forEach(recipe => {
            let articleElement = document.createElement('article');
            articleElement.classList.add('preview');

            let divTitle = document.createElement('div');
            divTitle.classList.add('title');

            let h2Element = document.createElement('h2');
            h2Element.textContent = recipe.name;
            divTitle.appendChild(h2Element);

            let divImage = document.createElement('div');
            divImage.classList.add('small');

            let imageElement = document.createElement('img');
            imageElement.src = recipe.img;

            divImage.appendChild(imageElement);
            articleElement.appendChild(divTitle);
            articleElement.appendChild(divImage);
            mainElement.appendChild(articleElement);

            articleElement.addEventListener('click', (e) => {
                fetch(`http://localhost:3030/jsonstore/cookbook/details/${recipe._id}`)
                .then(response => response.json())
                .then(info => {
                    mainElement.innerHTML = '';

                    let finalArticle = document.createElement('article');
                    let h2 = document.createElement('h2');
                    h2.textContent = info.name;

                    let divBand = document.createElement('div');
                    divBand.classList.add('band');

                    let divThumb = document.createElement('div');
                    divThumb.classList.add('thumb');
                    
                    let image = document.createElement('img');
                    image.src = info.img;
                    divThumb.appendChild(image);

                    let divIngredients = document.createElement('div');
                    divIngredients.classList.add('ingredients');

                    let h3Ingredients = document.createElement('h3');
                    h3Ingredients.textContent = 'Ingredients:';
                    divIngredients.appendChild(h3Ingredients);

                    let listOfIngredients = document.createElement('ul');

                    for (const ingredient of info.ingredients) {
                        let liIngredient = document.createElement('li');
                        liIngredient.textContent = ingredient;
                        listOfIngredients.appendChild(liIngredient);
                    }

                    let descriptionElement = document.createElement('div');
                    descriptionElement.classList.add('description');
                    let h3Description = document.createElement('h3');
                    h3Description.textContent = 'Preparation:';
                    
                    descriptionElement.appendChild(h3Description);

                    for (const step of info.steps) {
                        let pElement = document.createElement('p');
                        pElement.textContent = step;
                        descriptionElement.appendChild(pElement);
                    }

                    divIngredients.appendChild(listOfIngredients);
                    divBand.appendChild(divThumb);
                    divBand.appendChild(divIngredients);
                    finalArticle.appendChild(h2);
                    finalArticle.appendChild(divBand);
                    finalArticle.appendChild(descriptionElement);
                    mainElement.appendChild(finalArticle);
                });
            });
        });
    });
}