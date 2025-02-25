'use strict';

// localisation.js
function getLocalisation() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const {latitude, longitude} = position.coords;
				console.log('Coordonnées récupérées :', latitude, longitude);
				resolve({latitude, longitude});
			},
			(error) => {
				console.error('Géolocalisation non accessible :', error);
				const countryElem = document.querySelector('#country');
				if (countryElem) {
					countryElem.textContent = 'Localisation inaccessible';
				}
				reject(error);
			},
		);
	});
}

function initializeMap(latitude, longitude) {
	const mapInstance = L.map('map', {
		zoomControl: false,
		attributionControl: false,
	}).setView([latitude, longitude], 14);

	// Ajout du tile layer d'OpenStreetMap
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 23,
	}).addTo(mapInstance);

	const customIcon = L.divIcon({
		className: 'customIcon',
	});

	const shadowIcon = L.divIcon({
		className: 'shadowIcon',
	});

	L.marker([latitude, longitude], {icon:shadowIcon}).addTo(mapInstance);

	// On invalide la taille après un petit délai pour s'assurer que le conteneur est bien rendu
	setTimeout(() => {
		mapInstance.invalidateSize();
	}, 400);

	// Recalcule la taille lors d'un redimensionnement de la fenêtre
	window.addEventListener('resize', () => {
		mapInstance.invalidateSize();
	});
}

function getUserLocation() {
	getLocalisation()
		.then(({latitude, longitude}) => {
			initializeMap(latitude, longitude);
		})
		.catch((error) => {
			console.error('Erreur lors de la récupération de la localisation :', error);
		});
}

getUserLocation();
