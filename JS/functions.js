'use strict';
/* eslint-disable prefer-const */

/************** Dark Mode / Light Mode **************/
document.querySelector(`#darkLightMode`).addEventListener(`click`, () => {
	const mode = document.querySelector(`#mode`);

	const linkMode = mode.getAttribute(`href`);
	console.log(linkMode);
	const pathPrefix = linkMode.substring(0, linkMode.indexOf('CSS/'));

	const light = `${pathPrefix}CSS/light-mode.css`;
	const dark = `${pathPrefix}CSS/dark-mode.css`;

	if (mode.getAttribute(`href`) === `${light}`) {
		mode.setAttribute(`href`, `${dark}`);
	} else if (mode.getAttribute(`href`) === `${dark}`) {
		mode.setAttribute(`href`, `${light}`);
	} else {
		console.log(`Erreur inattendue lors du changement de mode`);
	}
});

/************** Icons creation **************/
function createIcon(type) {
	const iconTypes = {
		user: ['fa-solid', 'fa-user'],
		edit: ['fa-solid', 'fa-edit'],
		delete: ['fa-solid', 'fa-trash'],
		infos: ['fa-solid', 'fa-circle-info'],
	};

	if (iconTypes[type]) {
		const icon = document.createElement('i');
		icon.classList.add(...iconTypes[type]);
		return icon;
	} else {
		console.error("Type d'icône non reconnu:", type);
		return null;
	}
}

/************** Date **************/
function getDays() {
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
getDays();
setInterval(getDays, 24 * 60 * 60 * 1000);

/************** Time **************/
function getTime() {
	const date = new Date();
	const hours = String(date.getHours()).padStart(2, '0');
	const mins = String(date.getMinutes()).padStart(2, '0');
	const second = String(date.getSeconds()).padStart(2, '0');

	let time = document.querySelector(`.tempTime`);
	time.textContent = `${hours}:${mins}:${second}`;
}
getTime();
setInterval(getTime, 1000);

/************** Get Localisation **************/
function getLocalisation() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.watchPosition(
			(position) => {
				let latitude = position.coords.latitude;
				let longitude = position.coords.longitude;
				resolve([latitude, longitude]);
			},
			(erreur) => {
				console.error('Géolocalisation non accessible :', erreur);
				document.querySelector(`#country`).textContent = `Localisation inaccessible`;
				reject(erreur);
			},
		);
	});
}
getLocalisation();

/************** Fetch **************/
async function getData(url) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error.message);
	}
}

export {getData, getLocalisation, getTime, getDays, createIcon};
