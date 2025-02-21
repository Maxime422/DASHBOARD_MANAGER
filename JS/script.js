/* eslint-disable prefer-const */
// Dark Light Mode Toggle
const modeLightDark = document.querySelector(`#darkLightMode`);

modeLightDark.addEventListener(`click`, () => {
	const mode = document.querySelector(`#mode`);
	console.log(mode.getAttribute(`href`));

	const light = `CSS/light-mode.css`;
	const dark = `CSS/dark-mode.css`;

	if (mode.getAttribute(`href`) === `${light}`) {
		mode.setAttribute(`href`, `${dark}`);
		console.log(mode.getAttribute(`href`));
	} else if (mode.getAttribute(`href`) === `${dark}`) {
		mode.setAttribute(`href`, `${light}`);
		console.log(mode.getAttribute(`href`));
	} else {
		console.log(`Erreur inattendue lors du changement de mode`);
	}
});

function createIcon() {
	let icon = document.createElement('i');
	icon.classList.add('fa-solid', 'fa-circle-info');
	return icon;
}

// Form Request
const formTasks = document.querySelector(`form`);
formTasks.addEventListener(`submit`, (event) => {
	event.preventDefault();
	categoriesManagement();
});

// Categories
function categoriesManagement() {
	try {
		let categories = document.querySelector(`#categories`).value;
		console.log(categories);

		let categoriesList = document.querySelectorAll(`#categoriesList option`);
		console.log(categoriesList);

		categoriesList.forEach((option) => {
			if (option.value === categories) {
				let sectionCategory = document.querySelector(`#${categories}`);
				console.log(sectionCategory);
				if (sectionCategory) {
					NewTasks(sectionCategory);
				} else {
					console.error(`Section with id ${categories} not found.`);
				}
			}
		});
	} catch (error) {
		console.error(error.message);
	}
}

// NewTasks
function NewTasks(sectionCategory) {
    try {
        let title = Object.assign(document.createElement('h3'), { textContent: document.querySelector('#title').value });
        let subTitle = Object.assign(document.createElement('span'), { textContent: document.querySelector('#subTitle').value });
        let date = Object.assign(document.createElement('span'), { textContent: document.querySelector('#addDate').value });
        let description = Object.assign(document.createElement('p'), { textContent: document.querySelector('#description').value });
        console.log(description, date, subTitle, title);

        // Créez les boutons correctement
        let button1 = document.createElement('button');
        button1.type = 'button';
        button1.append(createIcon());

        let button2 = document.createElement('button');
        button2.type = 'button';
        button2.append(createIcon());

        let divActions = document.createElement('div');
        divActions.append(button1, button2);
        console.log(divActions);

        let header = document.createElement('header');
        header.append(createIcon(), title, divActions);
        console.log(header);

        let button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Terminé';

        let divStatuts = document.createElement('div');
        divStatuts.append(date, button);

        let article = document.createElement('article');
        article.append(header, subTitle, description, divStatuts);

		sectionCategory.append(article);

    } catch (error) {
        console.error(error.message);
    }
}
