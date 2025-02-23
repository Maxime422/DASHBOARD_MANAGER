"use strict";
/* eslint-disable prefer-const */
// Dark Light Mode Toggle
document.querySelector(`#darkLightMode`).addEventListener(`click`, () => {
	const mode = document.querySelector(`#mode`);

	// Variables Light Dark mode CSS
	const light = `CSS/light-mode.css`;
	const dark = `CSS/dark-mode.css`;

	if (mode.getAttribute(`href`) === `${light}`) {
		mode.setAttribute(`href`, `${dark}`);
	} else if (mode.getAttribute(`href`) === `${dark}`) {
		mode.setAttribute(`href`, `${light}`);
	} else {
		console.log(`Erreur inattendue lors du changement de mode`);
	}
});

// Fuction create Icons
function createIcon() {
	let icon = document.createElement('i');
	icon.classList.add('fa-solid', 'fa-circle-info');
	return icon;
}

// Form Request
document.querySelector(`form`).addEventListener(`submit`, (event) => {
	event.preventDefault();
	categoriesManagement();
});

// Categories
function categoriesManagement() {
	try {
		let categories = document.querySelector(`#categories`).value;

		let categoriesList = document.querySelectorAll(`#categoriesList option`);

		// Pour chaque option de la lists du form
		categoriesList.forEach((option) => {
			// Si l'option est === à la catégories de l'input
			if (option.value === categories) {
				let sectionCategory = document.querySelector(`#${categories}`);
				// si la section catégorie existe bien créer une nouvelle tasks
				if (sectionCategory) {
					NewTasks(sectionCategory);
				} else {
					console.error(`Section with id ${categories} not found.`);
				}
			} else {
				alert(`${categories} not found.`);
			}
		});
	} catch (error) {
		console.error(error.message);
	}
}

// NewTasks
function NewTasks(sectionCategory) {
	try {
		// Appelle de fonction createTags
		let tags = createTags();

		// Récupération et création des informations de l'article
		let title = Object.assign(document.createElement('h3'), {textContent: document.querySelector('#title').value});
		let date = Object.assign(document.createElement('span'), {textContent: document.querySelector('#addDate').value});
		let description = Object.assign(document.createElement('p'), {textContent: document.querySelector('#description').value});
		console.log(description, date, title);

		let button1 = document.createElement('button');
		button1.type = 'button';
		button1.append(createIcon());

		let button2 = document.createElement('button');
		button2.type = 'button';
		button2.append(createIcon());

		let divActions = document.createElement('div');
		divActions.append(button1, button2);

		let divTitle = document.createElement('div');
		divTitle.append(createIcon(), title);

		let header = document.createElement('header');
		header.append(divTitle, divActions);

		let button = document.createElement('button');
		button.type = 'button';
		button.textContent = 'Terminé';

		let divStatuts = document.createElement('div');
		if (tags) {
			divStatuts.append(tags, button);
		} else {
			divStatuts.append(button);
		}
		// Condition Tags != null
		let article = document.createElement('article');

		article.append(header, description, date, divStatuts);

		//  If tags === true apply style to tags
		if (tags) {
			tags.addEventListener('change', tagsStyle);
			tagsStyle({target: tags});
		}

		sectionCategory.append(article);
	} catch (error) {
		console.error(error.message);
	}
}

// Création des tags
function createTags() {
	let tagsForm = document.querySelector(`#tags`).value;
	if (tagsForm) {
		let tags = document.createElement('select');

		tags.setAttribute('class', 'tagsArticle');
		tags.setAttribute('name', 'tagLists');

		let options = ['À faire', 'En cours', 'Annulé', 'Terminé'];
		options.forEach((optionText) => {
			let option = document.createElement('option');
			option.value = optionText;
			option.textContent = optionText;
			tags.appendChild(option);
		});
	
		return tags;
	} else {
		console.log(`no tags`);
	}
}

// // Modifiaction des tags
function tagsStyle(event) {
	let selectElement = event.target;

	selectElement.classList.remove('redTags', 'orangeTags', 'blueTags', 'greenTags');
	switch (selectElement.value) {
		case `Annulé`:
			selectElement.classList.add(`redTags`);
			break;
		case `À faire`:
			selectElement.classList.add(`orangeTags`);
			break;
		case `En cours`:
			selectElement.classList.add(`blueTags`);
			break;
		case `Terminé`:
			selectElement.classList.add(`greenTags`);
			break;
		default:
			console.log('error, tagsStyle not works');
			break;
	}
}

// Calendar
const monthYearElement = document.querySelector(`#monthYear`);
const datesElement = document.querySelector(`.dates`);
const prevBtn = document.querySelector(`#prevBtn`);
const nextBtn = document.querySelector(`#nextBtn`);

let currentDate = new Date();

const updateCalendar = () => {
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	// Calculer le premier jour du mois actuel
	const firstDay = new Date(currentYear, currentMonth, 1);
	const firstDayIndex = firstDay.getDay(); // Jour de la semaine du premier jour

	// Calculer le dernier jour du mois actuel
	const lastDay = new Date(currentYear, currentMonth + 1, 0);
	const totalDays = lastDay.getDate();
	const lastDayIndex = lastDay.getDay(); // Jour de la semaine du dernier jour

	// Mettre à jour l'affichage du mois et de l'année
	const monthYearString = currentDate.toLocaleDateString('default', {month: 'long', year: 'numeric'});
	monthYearElement.textContent = monthYearString;

	let datesHTML = '';

	// Ajouter les jours du mois précédent
	const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
	for (let i = firstDayIndex - 1; i >= 0; i--) {
		const prevDate = prevMonthLastDate - i;
		datesHTML += `<div class="date inactive">${prevDate}</div>`;
	}

	// Ajouter les jours du mois actuel
	for (let i = 1; i <= totalDays; i++) {
		const date = new Date(currentYear, currentMonth, i);
		const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
		datesHTML += `<div class="date ${activeClass}">${i}</div>`;
	}

	// Ajouter les jours du mois suivant
	for (let i = 1; i <= 7 - (lastDayIndex + 1); i++) {
		const nextDate = new Date(currentYear, currentMonth + 1, i);
		datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
	}

	datesElement.innerHTML = datesHTML;
};

prevBtn.addEventListener('click', () => {
	currentDate.setMonth(currentDate.getMonth() - 1);
	updateCalendar();
});

nextBtn.addEventListener('click', () => {
	currentDate.setMonth(currentDate.getMonth() + 1);
	updateCalendar();
});
updateCalendar();

// Clock
time();

function time() {
	const date = new Date();
	const hours = String(date.getHours()).padStart(2, '0');
	const mins = String(date.getMinutes()).padStart(2, '0');
	const second = String(date.getSeconds()).padStart(2, '0');

	let time = document.querySelector(`.tempTime`);
	time.textContent = `${hours}:${mins}:${second}`;
}

setInterval(time, 1000);

// Days
days();
function days() {
	const date = new Date();
	let dateLocal = date.toLocaleDateString(`fr-Fr`, {
		day: `numeric`,
		month: `long`,
		year: `numeric`,
	});
	let weekday = date.toLocaleDateString(`fr-Fr`, {
		weekday: `long`,
	});

	let dateUpdate = document.querySelector(`#date`);
	dateUpdate.textContent = dateLocal;

	let weekdayUpdate = document.querySelector(`#weekday`);
	weekdayUpdate.textContent = weekday;
}
setInterval(days, 24 * 60 * 60 * 1000);

// Wheather
async function categoriesMeal() {
	const url = `https://www.themealdb.com/api/json/v1/1/filter.php`;
	try {
		const response = await fetch(url);
		console.log(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);
		// Meal(json);
	} catch (error) {
		console.error(error.message);
	}
}
categoriesMeal();
