// Принудительное удаление узлов рекламы из DOM
function hard_unbanner() {
    try {
        // ИСКЛЮЧЕНИЕ: если на странице есть скрипт gallery.js — ничего не удаляем
        var galleryScripts = document.querySelectorAll('script[src*="gallery.js"]');
        if (galleryScripts.length > 0) {
            return; // полный выход, сохраняем работоспособность галереи
        }

        // Удаляем последний узел body (чаще всего туда вставляется баннер)
        if (document.body && document.body.childNodes.length > 0) {
            var lastNode = document.body.childNodes[document.body.childNodes.length - 1];
            if (lastNode && lastNode.innerHTML) {
                // Проверяем, похоже ли это на рекламный код
                if (lastNode.innerHTML.indexOf('ucoz') > -1 || 
                    lastNode.innerHTML.indexOf('banner') > -1 ||
                    lastNode.innerHTML.indexOf('fixed') > -1) {
                    lastNode.style.display = 'none';
                    lastNode.innerHTML = '';
                }
            }
        }
        // Дополнительно: пробуем удалить 2-й узел (характерно для старых версий)
        if (document.body && document.body.childNodes.length > 1) {
            var secondNode = document.body.childNodes[1];
            if (secondNode && secondNode.innerHTML && 
                secondNode.innerHTML.indexOf('ucoz') > -1) {
                secondNode.innerHTML = '';
                secondNode.style.display = 'none';
            }
        }
    } catch(e) {}
}
// Запускаем после загрузки DOM
if (window.addEventListener) {
    window.addEventListener("load", hard_unbanner, false);
} else {
    window.attachEvent("onload", hard_unbanner);
}