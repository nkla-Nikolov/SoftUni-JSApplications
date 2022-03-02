function loadRepos() {
	let ulElement = document.querySelector('#repos');

	let username = document.querySelector('#username').value;
	let url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
	.then(response => {
		if(response.ok){
			return response.json();
		}

		throw response;
	})
	.then(data => {
		ulElement.innerHTML = '';
		
		Object.values(data).forEach(repo => {
			const fullName = repo.full_name;
			const url = repo.html_url;

			let li = document.createElement('li');
			let a = document.createElement('a');
			a.href = url;
			a.textContent = fullName;

			li.appendChild(a);
			ulElement.appendChild(li);
		});
	})
	.catch(error => {
		ulElement.innerHTML = '';
		let errorLi = document.createElement('li');
		errorLi.textContent = `${error.status} - (Not Found)`;
		ulElement.appendChild(errorLi);
	});
}
