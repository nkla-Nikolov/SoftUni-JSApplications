function lockedProfile() {
    let url = `http://localhost:3030/jsonstore/advanced/profiles`;
    let mainElement = document.querySelector('#main');
    mainElement.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let counter = 0;

            Object.values(data).forEach(x => {
                let divInnerHTML = `<div class="profile">
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user${counter++}Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user${counter}Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user${counter}Username" value="${x.username}" disabled readonly />
				<div class="hiddenInfo">
					<hr>
					<label>Email:</label>
					<input type="email" name="user${counter}Email" value="${x.email}" disabled readonly />
					<label>Age:</label>
					<input type="email" name="user${counter}Age" value="${x.age}" disabled readonly />
				</div>
				
				<button>Show more</button>
			</div>`;
            
            mainElement.innerHTML += divInnerHTML + '\n';
            });

            let buttons = Array.from(document.getElementsByTagName('button'));

            buttons.forEach(x => {
                x.addEventListener('click', (e) => {
                    if(e.currentTarget.parentNode.children[4].checked && e.currentTarget.textContent == 'Show more'){
                        e.currentTarget.parentNode.children[2].checked = false;

                        e.currentTarget.parentNode.children[9].classList.remove('hiddenInfo');
                        e.currentTarget.parentNode.children[9].style.display = 'block';
                        console.log(e.currentTarget.parentNode.children[9].children[2])
                        e.currentTarget.textContent = 'Hide it';
                    }
                    else{
                        e.currentTarget.parentNode.children[2].checked = true;
                        e.currentTarget.parentNode.children[4].checked = false;
                        e.currentTarget.textContent = 'Show more';
                        e.currentTarget.parentNode.children[9].classList.add('hiddenInfo');
                        e.currentTarget.parentNode.children[9].style.display = 'none';
                    }
                });
            })
        })
        .catch(err => console.log(err));
}