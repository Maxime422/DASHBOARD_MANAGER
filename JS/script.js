const modeLightDark = document.querySelector('#darkLightMode');
modeLightDark.addEventListener('click', () => {
	const mode = document.querySelector('#mode');
	console.log(mode.getAttribute('href'));

	const light = 'CSS/dark-mode.css';
    const dark = 'CSS/dark-mode.css';

	if (mode.getAttribute('href') === 'CSS/dark-mode.css') {
		mode.setAttribute('href', './CSS/light-mode.css');
	} else if (mode.getAttribute('href') === './CSS/light-mode.css') {
		mode.setAttribute('href', 'CSS/dark-mode.css');
	} else {
		console.log('Erreur inattendue lors du changement de mode');
	}
});
