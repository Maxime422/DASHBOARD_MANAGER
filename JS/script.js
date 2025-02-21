const modeLightDark = document.querySelector('#darkLightMode');

modeLightDark.addEventListener('click', () => {
	const mode = document.querySelector('#mode');
	console.log(mode.getAttribute('href'));

	const light = 'CSS/dark-mode.css';
	const dark = 'CSS/dark-mode.css';

	if (mode.getAttribute('href') === `${light}`) {
		mode.setAttribute('href', `${dark}`);
	} else if (mode.getAttribute('href') === `${dark}`) {
		mode.setAttribute('href', `${light}`);
	} else {
		console.log('Erreur inattendue lors du changement de mode');
	}
});

