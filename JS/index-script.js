'use strict';
/* eslint-disable prefer-const */

import {getData, getLocalisation, createIcon} from './functions.js';

/************** Form Request **************/
document.querySelector(`form`).addEventListener(`submit`, (event) => {
	event.preventDefault();
	categoriesManagement();
});

/************** Category selection **************/
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
			}
		});
	} catch (error) {
		console.error(error.message);
	}
}

/************** New Tasks **************/
function NewTasks(sectionCategory) {
	try {
		let tags = createTags();

		// Récupération et création des informations de l'article
		let title = Object.assign(document.createElement('h3'), {textContent: document.querySelector('#title').value});
		let date = Object.assign(document.createElement('span'), {textContent: document.querySelector('#addDate').value});
		let description = Object.assign(document.createElement('p'), {textContent: document.querySelector('#description').value});

		let editBtn = document.createElement('button');
		editBtn.type = 'button';
		editBtn.append(createIcon(`edit`));

		let deleteBtn = document.createElement('button');
		deleteBtn.type = 'button';
		deleteBtn.append(createIcon(`delete`));

		let divActions = document.createElement('div');
		divActions.append(editBtn, deleteBtn);

		let divTitle = document.createElement('div');
		divTitle.append(createIcon(`infos`), title);

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

/************** Locate **************/
async function getLocate() {
	try {
		const [latitude, longitude] = await getLocalisation();
		const data = await getData(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
		updatePosition(data);
		console.log(data);
	} catch (error) {
		console.error('Erreur lors de la récupération de la localisation :', error);
	}
}
getLocate();

/************** Update Locate **************/
function updatePosition(data) {
	if (data) {
		document.querySelector(`#country`).textContent = `${data.address.country}, ${data.address.country_code}`;
		document.querySelector(`#city`).textContent = `${data.address.municipality}, ${data.address.postcode}`;
	}
}

/************** Temperature **************/
async function getTemp() {
	try {
		const [latitude, longitude] = await getLocalisation();
		const data = await getData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c8e87e8006e651c90643bfc35c5ebeae&units=Metric&lang=fr`);
		updateTemp(data);
	} catch (error) {
		console.error('Erreur lors de récupération des données météo :', error);
	}
}
getTemp();

/************** Update Temperature **************/
function updateTemp(data) {
	if (data) {
		document.querySelector(`#humidityWeather`).textContent = `humidité : ${data.main.humidity}%`;
		document.querySelector(`#statutWeather`).textContent = `${data.weather[0].description}`;

		let tempString = data.main.temp.toString();
		let resultat = tempString.includes('.') ? tempString.split('.')[0] : tempString.slice(0, 2);
		document.querySelector(`#tempWeather`).textContent = `${resultat}°c`;

		// État de la météo
		const WeatherStatuts = `Rain`;
		StatesAnimation(WeatherStatuts);
	}
}

function StatesAnimation(WeatherStatuts) {
	// Vérifie que le conteneur existe dans le DOM
	const container = document.querySelector('.containerWeather');

	switch (WeatherStatuts) {
		case 'Clouds':
			container.innerHTML = `<div class="cloud front">
				<span class="left-front cloudStyle"></span>
				<span class="right-front cloudStyle"></span>
		  	</div>
		  	<span class="sun sunCloud sunshine"></span>
		  	<span class="sun sunCloud"></span>
		  	<div class="cloud back">
				<span class="left-back cloudStyle"></span>
				<span class="right-back cloudStyle"></span>
		  	</div>`;
			break;

		case 'Clear':
			container.innerHTML = `<span class="sun sunClear sunshine"></span>
		  	<span class="sun sunClear"></span>`;
			break;

		case 'Snow':
			console.log(WeatherStatuts, 'bonjour 1');
			container.innerHTML = `<div class="cloud front">
				<span class="left-front cloudStyle"></span>
				<span class="right-front cloudStyle"></span>
		  	</div>
		  	<div class="cloud back">
				<span class="left-back cloudStyle"></span>
				<span class="right-back cloudStyle"></span>
		  	</div>`;
			break;

		case 'Rain':
			container.innerHTML = `<div class="cloud front rain">
				<span class="left-front cloudStyle"></span>
				<span class="right-front cloudStyle"></span>
		  	</div>
		  	<span class="sun sunCloud sunshine"></span>
		  	<span class="sun sunCloud"></span>
		  	<div class="cloud back">
				<span class="left-back cloudStyle"></span>
				<span class="right-back cloudStyle"></span>
		  	</div>`;
			break;

		case 'Thunderstorm':
			container.innerHTML = `<div class="cloud front rain">
				<span class="left-front cloudStyle"></span>
				<span class="right-front cloudStyle"></span>
		  	</div>
		  	<span class="sun sunCloud sunshine"></span>
		  	<span class="sun sunCloud"></span>
		  	<div class="cloud back">
				<span class="left-back cloudStyle"></span>
				<span class="right-back cloudStyle"></span>
		  	</div>`;
			break;

		default:
			console.log(WeatherStatuts, 'bonjour 2');
	}
}
