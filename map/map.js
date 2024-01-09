const box = document.getElementById('map');

let isDown = false;
let startX;
let startY;
let scrollLeft;
let scrollTop;

box.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - box.offsetLeft;
  startY = e.pageY - box.offsetTop;
  scrollLeft = box.scrollLeft;
  scrollTop = box.scrollTop;
  box.style.cursor = 'grabbing';
});

box.addEventListener('mouseleave', () => {
  isDown = false;
  box.style.cursor = 'grab';
});

box.addEventListener('mouseup', () => {
  isDown = false;
  box.style.cursor = 'grab';
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - box.offsetLeft;
  const y = e.pageY - box.offsetTop;
  const walkX = (x - startX) * 1; // Change this number to adjust the scroll speed
  const walkY = (y - startY) * 1; // Change this number to adjust the scroll speed
  box.scrollLeft = scrollLeft - walkX;
  box.scrollTop = scrollTop - walkY;
});

//Реализация масштабирования при помощи скролинга колёсиком мыши

//Переменные
var delta; // Направление колёсика мыши
//Объявление переменной значения зума
var isCall = false;
    if(!isCall){
    var zoom = 1;
    isCall = true;//Чтобы начальное значение было присвоено 1 раз
    }

//Функция для добавления обработчика событий
function addHandler(object, event, handler){
    if(object.addEventListener){
    object.addEventListener(event, handler, false);
    }else if(object.attachEvent){
    object.attachEvent('on' + event, handler);
    }else alert("Обработчик не поддерживается");
    }

// Добавляем обработчики для разных браузеров
addHandler(window, 'DOMMouseScroll', wheel);
addHandler(window, 'mousewheel', wheel);
addHandler(document, 'mousewheel', wheel);

// Функция, обрабатывающая событие
function wheel(event){
event = event || window.event;
// Opera и IE работают со свойством wheelDelta
    if (event.wheelDelta){ // В Opera и IE
    delta = event.wheelDelta / 120;
// В Опере значение wheelDelta такое же, но с противоположным знаком
        if (window.opera){
        delta = -delta;// Дополнительно для Opera
        }
    }else if(event.detail){ // Для Gecko
    delta = -event.detail / 3;
    }
    // Запрещаем обработку события браузером по умолчанию
    if (event.preventDefault){
    event.preventDefault();
    }else{
    event.returnValue = false;//Для ослика
    }

//Выполняем зум
    if(delta > 0){
    zoom += 0.1;//Шаг
    document.body.style.MozTransform = zoom; // для FireFox
    document.body.style.OTransform = zoom; // для Opera
    document.body.style.zoom = zoom;
    }else{
    zoom -= 0.1;//Шаг
    document.body.style.MozTransform = zoom; // для FireFox
    document.body.style.OTransform = zoom; // для Opera
    document.body.style.zoom = zoom;
    }
    }