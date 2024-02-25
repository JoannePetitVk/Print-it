let slides = [
	{
		"image": "slide1.jpg",
		"tagLine": "Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image": "slide2.jpg",
		"tagLine": "Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image": "slide3.jpg",
		"tagLine": "Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image": "slide4.png",
		"tagLine": "Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

// Sélection des éléments du DOM. Récupére toutes les images du carrousel, ce qui permet de les manipuler plus tard
let carrouselImages = document.querySelectorAll('#banner .banner-img');
console.log(carrouselImages);
// Ces éléments servent à montrer quelle image est actuellement affichée ("points")
let dotsContainer = document.querySelector('#banner .dots');
console.log(dotsContainer);
// Permet de savoir quelle image est actuellement affichée et de changer dynamiquement l'image
let currentSlideIndex = 0;

// Sélection des flèches gauche et droite du carrousel
let leftArrow = document.querySelector('#banner .arrow_left');
let rightArrow = document.querySelector('#banner .arrow_right');
console.log(leftArrow, rightArrow);

/// Ecouteurs d'événements sur ces flèches, permet à l'utilisateur de naviguer entre les images en cliquant sur ces flèches
//Indique au carrousel de passer à la diapositive précédente
leftArrow.addEventListener('click', () => {
	console.log("Clic sur la flèche gauche");
	changeSlides('prev');
});

// Indique au carrousel de passer à la diapositive suivante
rightArrow.addEventListener('click', () => {
	console.log("Clic sur la flèche droite");
	changeSlides('next');
});


// Boucle pour créer un point pour chaque image du carrousel
slides.forEach((slide, index) => {
	let dot = document.createElement('div');
	dot.classList.add('dot');
	// Ajout de la classe dot_selected pour le premier point (diapositive actuelle)
	if (index === 0) {
		dot.classList.add('dot_selected');
	}
	// Ajout du point au conteneur des points du carrousel
	dotsContainer.appendChild(dot);
});


// Sélection de tous les points du carrousel
let dots = document.querySelectorAll('#banner .dots .dot');
dots.forEach((dot, index) => {
	// Ajout d'un event listener à chaque point
	dot.addEventListener('click', () => {
		// Mise à jour de la diapositive en fonction de l'index du point cliqué
		currentSlideIndex = index;
		updateSlide(currentSlideIndex);
	});
});
function updateSlide(index) {
	console.log("Mise à jour de la slide à l'index :", index);
	// Mise à jour des points du carrousel
	let dots = document.querySelectorAll('#banner .dots .dot');
	dots.forEach((dot, i) => {
		if (i === index) {
			dot.classList.add('dot_selected');
		} else {
			dot.classList.remove('dot_selected');
		}
	});

	// Mise à jour de chaque image du carrousel avec la nouvelle image et l'attribut alt
	carrouselImages.forEach((image, i) => {
		image.src = `./assets/images/slideshow/${slides[index].image}`;
		image.alt = `Banner Print-it${slides[index].image}`;
	});

	// Mise à jour de la ligne de texte correspondante à la diapositive
	let tagLine = document.querySelector('#banner p');
	tagLine.innerHTML = slides[index].tagLine;
}

// Permet de naviguer entre les diapositives d'un carrousel en avant ou en arrière
function changeSlides(direction) {
	if (direction === 'next') {
		currentSlideIndex = (currentSlideIndex + 1) % slides.length;
	} else if (direction === 'prev') {
		currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
	}
	updateSlide(currentSlideIndex);
}


