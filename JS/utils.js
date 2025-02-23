'use strict';
/* eslint-disable prefer-const */
document.querySelector(`#darkLightMode`).addEventListener(`click`, () => {
	const mode = document.querySelector(`#mode`);

	// Variables Light Dark mode CSS
	const light = `../CSS/light-mode.css`;
	const dark = `../CSS/dark-mode.css`;

	if (mode.getAttribute(`href`) === `${light}`) {
		mode.setAttribute(`href`, `${dark}`);
	} else if (mode.getAttribute(`href`) === `${dark}`) {
		mode.setAttribute(`href`, `${light}`);
	} else {
		console.log(`Erreur inattendue lors du changement de mode`);
	}
});
