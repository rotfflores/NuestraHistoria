const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    // Cerrar la barra al hacer clic en el overlay
    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });


    // Script para el carrusel
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
      }, 5000); // Cambia cada 5 segundos
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Controles manuales
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

    // Iniciar el deslizamiento automático al cargar la página
    startAutoSlide();

    // Pausar el deslizamiento automático al pasar el ratón por encima
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    // Script para el contador de días
    const startDate = new Date('2025-06-21');
    const today = new Date();
    const diferenceInTime = today - startDate;
    const dias = Math.floor(diferenceInTime / (1000 * 3600 * 24));
    const diasTotalesElement = document.getElementById('dias-totales');
    diasTotalesElement.textContent = dias;