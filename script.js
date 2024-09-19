let slideIndex = 1;
showSlides(slideIndex);

// Controllo dei pulsanti "prev" e "next"
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Controllo degli indicatori di navigazione (i "dots")
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Funzioni per gestire lo swipe
let xDown = null; // Posizione iniziale del tocco sull'asse X
let yDown = null; // Posizione iniziale del tocco sull'asse Y

// Funzione per iniziare il rilevamento del tocco
function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

// Funzione per rilevare la fine del tocco e il movimento
function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    // Verifica se lo swipe è principalmente orizzontale
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // Swipe verso sinistra
            plusSlides(1); // Passa all'immagine successiva
        } else {
            // Swipe verso destra
            plusSlides(-1); // Torna all'immagine precedente
        }
    }

    // Reset delle variabili
    xDown = null;
    yDown = null;
}

// Aggiungi i listener per il rilevamento del tocco
const slideshowContainer = document.querySelector('.slideshow-container');
slideshowContainer.addEventListener('touchstart', handleTouchStart, false);
slideshowContainer.addEventListener('touchmove', handleTouchMove, false);
