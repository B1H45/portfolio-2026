//MOSTLY TAKEN FROM ANDREW'S ACCESSIBLE DROPDOWN TEMPLATE, with a few changes made for it to work with out vision

"use strict";


console.log('JavaScript is running.');



let menu = document.querySelector('#menu');


menu.classList.add('hidden');


menu.setAttribute('aria-hidden', 'true');
menu.setAttribute('aria-labelledby', 'menu-toggle');


let dropdown = document.querySelector('.dropdown');



let menuToggle = document.createElement('button');



menuToggle.classList.add('dropdown-toggle');



menuToggle.setAttribute('id', 'menu-toggle');


menuToggle.innerHTML = 'Filter By ▼';



menuToggle.setAttribute('aria-label', 'Main menu');
menuToggle.setAttribute('aria-controls', 'menu');
menuToggle.setAttribute('aria-expanded', 'false');

dropdown.insertBefore(menuToggle, menu);



menuToggle.addEventListener('mouseenter',
	function() {

		console.log('menuToggle has been clicked.');

		if ( menu.classList.contains('hidden') ) {
			console.log('Menu is hidden, showing the menu.');


			menu.classList.remove('hidden');


			menu.setAttribute('aria-hidden', 'false');
			menuToggle.setAttribute('aria-expanded', 'true');

			this.innerHTML = 'Filter By ▲';
		}

	}
);

menuToggle.addEventListener('click',
	function() {


		console.log('menuToggle has been clicked.');



        // From https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
        if (menuToggle.matches(':focus-visible')) {
            if ( menu.classList.contains('hidden') ) {
                console.log('Menu is hidden, showing the menu.');


                menu.classList.remove('hidden');


                menu.setAttribute('aria-hidden', 'false');
                menuToggle.setAttribute('aria-expanded', 'true');


                this.innerHTML = 'Filter By ▲';
            }


            else {
                console.log('Menu is shown, hiding the menu.');


                menu.classList.add('hidden');


                menu.setAttribute('aria-hidden', 'true');
                menuToggle.setAttribute('aria-expanded', 'false');

                this.innerHTML = 'Filter By ▼';

            }
        }
		

	}
);

menu.addEventListener('mouseleave',
	function() {


		console.log('menuToggle has been clicked.');



		if (! menu.classList.contains('hidden') ) {
			console.log('Menu is shown, hiding the menu.');

			menu.classList.add('hidden');


			menu.setAttribute('aria-hidden', 'true');
			menuToggle.setAttribute('aria-expanded', 'false');


			menuToggle.innerHTML = 'Filter By ▼';

	}
}
);

menuToggle.addEventListener('mouseleave',
	function() {


		console.log('menuToggle has been clicked.');


        // .matches from https://stackoverflow.com/questions/43366738/how-to-check-if-mouse-is-still-over-element-in-javascript
		if (! menu.classList.contains('hidden') && !menu.matches(':hover')) {
			console.log('Menu is shown, hiding the menu.');


			menu.classList.add('hidden');


			menu.setAttribute('aria-hidden', 'true');
			menuToggle.setAttribute('aria-expanded', 'false');

			menuToggle.innerHTML = 'Filter By ▼';

	}
}
);