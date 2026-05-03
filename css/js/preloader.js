// Ждём полной загрузки страницы
window.addEventListener('load', () => {
  // Плавно скрываем прелоадер
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  
  // Через 500 мс полностью убираем его из потока документа
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
});