document.addEventListener("DOMContentLoaded", function() {
    // Hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    let autoSlideInterval;

    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (nextButton && prevButton) { // Evitar error si no hay carrusel en la página
        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
            startAutoSlide();
        });

        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
            startAutoSlide();
        });

        startAutoSlide();
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Contador de días
    const startDate = new Date('2025-06-21');
    const today = new Date();
    const diferenceInTime = today - startDate;
    const dias = Math.floor(diferenceInTime / (1000 * 3600 * 24));
    const diasTotalesElement = document.getElementById('dias-totales');
    if (diasTotalesElement) {
        diasTotalesElement.textContent = dias;
    }

    // Contraseña para mostrar carta
    const cartaPassword = document.getElementById("carta-password");
    const contentCarta = document.querySelector(".content-carta");
    const passwordInput = document.getElementById("password-input");
    const errorMessage = document.getElementById("password-error");
    const correctPassword = "o";

    if (cartaPassword && contentCarta && passwordInput && errorMessage) {
        if (localStorage.getItem("cartaUnlocked") === "true") {
            cartaPassword.style.display = "none";
            contentCarta.classList.add("active");
        }

        function checkPassword() {
            const password = passwordInput.value;
            if (password === correctPassword) {
                cartaPassword.style.display = "none";
                contentCarta.classList.add("active");
                localStorage.setItem("cartaUnlocked", "true");
                errorMessage.style.display = "none";
            } else {
                errorMessage.style.display = "block";
                passwordInput.value = "";
            }
        }

        document.getElementById("submit-password").addEventListener("click", checkPassword);

        passwordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                checkPassword();
            }
        });
    }
});
