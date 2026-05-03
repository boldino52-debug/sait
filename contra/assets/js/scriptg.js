// Получаем элементы
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Находим все изображения галереи
const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
let currentIndex = 0;

// Функция открытия модального окна с определённым индексом
function openModal(index) {
    currentIndex = index;
    const img = galleryImages[currentIndex];
    modal.style.display = 'block';
    modalImg.src = img.src;       // используем src миниатюры (можно заменить на data-full)
    modalImg.alt = img.alt;
    captionText.innerHTML = img.alt;
}

// Функция закрытия
function closeModal() {
    modal.style.display = 'none';
}

// Функция переключения на следующее/предыдущее
function changeImage(direction) {
    currentIndex += direction;
    // Зацикливаем (если вышли за пределы)
    if (currentIndex < 0) currentIndex = galleryImages.length - 1;
    if (currentIndex >= galleryImages.length) currentIndex = 0;

    const img = galleryImages[currentIndex];
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    captionText.innerHTML = img.alt;
}

// Добавляем обработчик клика на каждое изображение
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
});

// Закрытие по крестику
closeBtn.addEventListener('click', closeModal);

// Закрытие по клику вне изображения (на тёмную область)
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Навигация по кнопкам
prevBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // не даём клику всплыть до modal
    changeImage(-1);
});

nextBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    changeImage(1);
});

// Навигация с клавиатуры
document.addEventListener('keydown', (event) => {
    if (modal.style.display === 'block') {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});