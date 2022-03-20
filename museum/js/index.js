"use strict"

//Menu scripts
const indexBody = document.body;
const menuLinks = document.querySelectorAll('a[data-goto]')
if(menuLinks.length > 0){
    menuLinks.forEach((link)=>{
        link.addEventListener('click', menuLinkClick)
    });
}

const menuIcon = document.querySelector('.header-menu__icon');
const menuUL = document.querySelector('.header-menu__items');
function menuAddActiveClass(event){
    menuIcon.classList.toggle('_active');
    menuUL.classList.toggle('_active');
    indexBody.addEventListener('click', menuClose, false);
}
function menuClose(event){
    let targetClick = event.target;
    if(menuIcon.classList.contains('_active') && targetClick !== menuUL && targetClick !== menuIcon && targetClick !== document.querySelector('#ingSpan')){
        menuIcon.classList.remove('_active');
        menuUL.classList.remove('_active');
        indexBody.removeEventListener('click', menuClose);
    }
}
function menuLinkClick(event){
    const menuLink = event.target;

    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
        window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
        });
        event.preventDefault();
    }
    if(menuIcon.classList.contains('_active')){
        menuIcon.classList.remove('_active');
        menuUL.classList.remove('_active');
    }
}
if(menuIcon && menuUL){
    menuIcon.addEventListener('click', menuAddActiveClass);
}

//Virtual Tour
const discoverBtn = document.querySelector('.header-content__info-btn');
const tourItems = document.querySelectorAll('.virtual-tour__content-gallery-item');
tourItems.forEach((element)=>{
    element.addEventListener('click', function(event){
        tourItems.forEach((element,index)=>{
            if(this === element){
                sessionStorage.setItem('virtual-tour', index);
            }
            window.location.href = `virtual.html`;
        })
    })
})
discoverBtn.addEventListener('click', function(event){
    sessionStorage.setItem('virtual-tour', 6);
    window.location.href = `virtual.html`;
})

//Forms

let formes = Array.from(document.forms);
formes.forEach((form)=>{
    form.addEventListener('submit', (event) =>{
        event.preventDefault();
    })
})

let btnBooking = document.querySelector('.buy-tickets__content-amount-buy-now');

btnBooking.addEventListener('click', function(){
    let sectionBooking = document.querySelector('.buy-tickets__booking-tickets');
    sectionBooking.classList.add('_active');
});

let btnExit = document.querySelector('.booking-tickets__exit');

btnExit.addEventListener('click', function(){
    let sectionBooking = document.querySelector('.buy-tickets__booking-tickets');
    sectionBooking.classList.remove('_active');
});


//Header slider

const swiper = new Swiper('.header-slider__wrapper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: '.header-slider__navigation-arrow-right',
      prevEl: '.header-slider__navigation-arrow-left',
    },
    pagination:{
        el:'.header-slider__navigation-dots',
        clickable: true,
        type:'bullets',
    },
    autoplay:{
        delay: 5000,
    }
});

//Video-player

//Video
const videoWrapper = document.querySelector('.video-journey__video');
const videoPlayer = videoWrapper.querySelector('video');
//buttons
const playButton = videoWrapper.querySelector('.video-journey__video-control-play');
const startButton = videoWrapper.querySelector('.video-journey__video-control-start');
const muteButton = videoWrapper.querySelector('.video-journey__video-control-volume');
const fullscreenButton = videoWrapper.querySelector('.video-journey__video-control-screen');
//Sliders
const volumeBar = videoWrapper.querySelector('.video-journey__video-control-volume-bar');
const seekBar = videoWrapper.querySelector('.video-journey__video-control-seek-bar');

if(playButton && startButton){
    const playIcon = playButton.querySelector('span');
    playButton.addEventListener('click', function(){
        if(playIcon.classList.contains('_icon-play-player-icon') === true){
            playIcon.classList.remove('_icon-play-player-icon');
            playIcon.classList.add('_icon-pause2');
        }else{
            playIcon.classList.remove('_icon-pause2');
            playIcon.classList.add('_icon-play-player-icon');
        }
        if(videoPlayer.paused === true){
            videoPlayer.play();
            startButton.style.display = 'none';
        }else{
            videoPlayer.pause();
            startButton.style.display = 'block';
        }
    });
    startButton.addEventListener('click', function(){
        if(playIcon.classList.contains('_icon-play-player-icon') === true){
            playIcon.classList.remove('_icon-play-player-icon');
            playIcon.classList.add('_icon-pause2');
        }else{
            playIcon.classList.remove('_icon-pause2');
            playIcon.classList.add('_icon-play-player-icon');
        }
        if(videoPlayer.paused === true){
            videoPlayer.play();
            startButton.style.display = 'none';
        }else{
            videoPlayer.pause();
            startButton.style.display = 'block';
        }
    });
}
if(muteButton){
    const muteIcon = muteButton.querySelector('span');
    muteButton.addEventListener('click', function(){
        if(muteIcon.classList.contains('_icon-volume-icon') === true){
            muteIcon.classList.remove('_icon-volume-icon');
            muteIcon.classList.add('_icon-volume-mute2');
        }else{
            muteIcon.classList.remove('_icon-volume-mute2');
            muteIcon.classList.add('_icon-volume-icon');
        }
        if(videoPlayer.muted === false){
            videoPlayer.muted = true;
        }else{
            videoPlayer.muted = false;
        }
    });
}
if(fullscreenButton){
    fullscreenButton.addEventListener('click', function(){
        if(videoPlayer.requestFullscreen){
            videoPlayer.requestFullscreen();
        }
    })
}
if(seekBar){
    seekBar.addEventListener('change', function(){
        let time = videoPlayer.duration * (seekBar.value / 100);
        videoPlayer.currentTime = time;
    });
    videoPlayer.addEventListener("timeupdate", function() {
        let value = (100 / videoPlayer.duration) * videoPlayer.currentTime;
        seekBar.value = value;
    });
}
if(volumeBar){
    const muteIcon = muteButton.querySelector('span');
    volumeBar.addEventListener("change", function() {
        videoPlayer.volume = volumeBar.value / 100;
        if(volumeBar.value / 100 === 0){
            muteIcon.classList.remove('_icon-volume-icon');
            muteIcon.classList.add('_icon-volume-mute2');
        }else if(muteIcon.classList.contains('_icon-volume-mute2') === true && videoPlayer.muted === false){
            muteIcon.classList.remove('_icon-volume-mute2');
            muteIcon.classList.add('_icon-volume-icon');
        }
    });
}
//Video-gallery
const secondSwiper = new Swiper('.video-journey__gallery-slider',{
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    navigation: {
        nextEl: '.gallery-slider-arrows-right',
        prevEl: '.gallery-slider-arrows-left',
    },
    pagination: {
        el:'.video-journey__gallery-slider-dotes',
        clickable: true,
        type:'bullets',
    },
})

//Buy-tickets scripts
const contentTicketsWrap = document.querySelector('.buy-tickets__content');
const radioInputs = contentTicketsWrap.querySelectorAll('input[type="radio"]');
if(contentTicketsWrap){
    const tickets = contentTicketsWrap.querySelectorAll('.buy-tickets__content-amount-age-input-wrap');
    const amountResult = contentTicketsWrap.querySelector('.buy-tickets__content-amount-total').querySelector('span');
    let amountCalc = new CalcTickets(amountResult);
    amountCalc.initialization();

    tickets.forEach(function(element){
        let minus = element.querySelector('.buy-tickets__content-amount-button-minus');
        let input = element.querySelector('input');
        let plus = element.querySelector('.buy-tickets__content-amount-button-plus');
        minus.addEventListener('click', ()=>{
            if(input.value <= 0){
                input.value = 20;
            }else{
                input.value--;
            }
            localStorage.setItem(input.id, input.value);
            amountCalc.initResult();
        })
        plus.addEventListener('click', ()=>{
            if(input.value >= 20){
                input.value = 0;
            }else{
                input.value++;
            }
            localStorage.setItem(input.id, input.value);
            amountCalc.initResult();
        })
        input.addEventListener('change', function(){
            if(this.value >= 0 && this.value <= 20 && Number(this.value)){
                localStorage.setItem(this.id, this.value);
                amountCalc.initResult();
            }else{
                alert('Введите число меньше 20, но больше нуля');
            }
        })
    });
    radioInputs.forEach((element)=>{
        element.addEventListener('change', function(){
            if(this.checked){
                localStorage.setItem(this.id, true);
            }
            radioInputs.forEach((elem)=>{
                if(localStorage.getItem(elem.id) && elem.checked == false) localStorage.removeItem(elem.id);
            })
            amountCalc.initResult();
        })
    })
    if(localStorage.getItem('basic_18')) document.getElementById('basic_18').value = localStorage.getItem('basic_18');
    if(localStorage.getItem('senior_18')) document.getElementById('senior_18').value = localStorage.getItem('senior_18');
    radioInputs.forEach((element)=>{
        if(localStorage.getItem(element.id)){
            element.checked = true;
            amountCalc.initResult();
        }
    })
}
//Booking tickets
const buyNowBtn = document.querySelector('.buy-tickets__content-amount-buy-now');
const bookingWrap = document.querySelector('.booking-tickets');
function addPriceTickets(){
    basicTicketsForCalc.forEach(function(element){
        if(element.dataset.calcticket){
            calc.initPriceOneTicket(element, 'basic', true);
        }else{
            calc.initPriceOneTicket(element, 'basic');
        }
    })
    seniorTicketsForCalc.forEach(function(element){
        if(element.dataset.calcticket){
            calc.initPriceOneTicket(element, 'senior', true);
        }else{
            calc.initPriceOneTicket(element, 'senior');
        }
    })
}
function checkPattern (pattern, value){
    return pattern.test(value)
};
function printErrorLine(element, switching){
    if(!switching){
      element.style.borderBottom = '1px solid #030303';
    }else{
      element.style.borderBottom = 'red 2px solid';
    }
}
function createError(){
    alert('Пожалуйста, введите корректное значение');
}
if(buyNowBtn){
    let patternObj = new Object();
    patternObj.phone = /^\+?[0-9]{0,1}\(?[0-9]{0,5}\)?[0-9]+$/;
    patternObj.email = /^.+@.+\..{2,3}$/;
    patternObj.name = /^[a-zA-ZА-ЯЁёа-я ]{3,15}$/
    const resultPrice = bookingWrap.querySelector('.booking-tickets__card-title').querySelector('span');
    const selectBooking = bookingWrap.querySelector('select');
    const collectionOptions = selectBooking.querySelectorAll('option');
    const typeTicketSpan = bookingWrap.querySelector('._icon-approval').querySelector('span');
    const ticketsChoiceWrap = bookingWrap.querySelectorAll('.booking-tickets__entry-ticket-btn-wrap');
    const ticketsContent = bookingWrap.querySelectorAll('div[data-_typeTicket]');
    const phoneInput = bookingWrap.querySelector('#inputTel');
    const emailInput = bookingWrap.querySelector('#inputEmail');
    const nameInput = bookingWrap.querySelector('#inputName');
    var basicTicketsForCalc = bookingWrap.querySelectorAll('.basicTicketForCalc');
    var seniorTicketsForCalc = bookingWrap.querySelectorAll('.seniorTicketForCalc');

    var calc = new CalcTickets(resultPrice);
    calc.initialization();

    ticketsChoiceWrap.forEach(function(element, index){
        let minus = element.querySelector('.booking-tickets__entry-ticket-btn-minus');
        let input = element.querySelector('input');
        let plus = element.querySelector('.booking-tickets__entry-ticket-btn-plus');
        minus.addEventListener('click', ()=>{
            if(input.value <= 0){
                input.value = 20;
                ticketsContent[index].innerHTML = input.value
            }else{
                input.value--;
                ticketsContent[index].innerHTML = input.value
            }
            localStorage.setItem(input.dataset.id, input.value);
            addPriceTickets();
            calc.initResult();
        })
        plus.addEventListener('click', ()=>{
            if(input.value >= 20){
                input.value = 0;
                ticketsContent[index].innerHTML = input.value
            }else{
                input.value++;
                ticketsContent[index].innerHTML = input.value
            }
            localStorage.setItem(input.dataset.id, input.value);
            addPriceTickets();
            calc.initResult();
        })
        input.addEventListener('change', function(){
            if(this.value >= 0 && this.value <= 20 && Number(this.value)){
                localStorage.setItem(this.dataset.id, this.value);
                ticketsContent[index].innerHTML = this.value;
            }else{
                alert('Введите число меньше 20, но больше нуля');
            }
            addPriceTickets();
            calc.initResult();
        })
    });
    buyNowBtn.addEventListener('click', ()=>{
        radioInputs.forEach((element)=>{
            if(localStorage.getItem(element.id)){
             selectBooking.value = element.id;
            }
        });
        collectionOptions.forEach((elem)=>{
            if(localStorage.getItem(elem.value)) typeTicketSpan.innerHTML = elem.innerHTML;
        });
        ticketsContent.forEach(function(element){
            if(localStorage.getItem(element.dataset._typeticket)) element.innerHTML = localStorage.getItem(element.dataset._typeticket);
        })
        ticketsChoiceWrap.forEach(function(element){
            let input = element.querySelector('input');
            if(localStorage.getItem(input.dataset.id)) input.value = localStorage.getItem(input.dataset.id);
        })
        addPriceTickets();
        calc.initResult();
        selectBooking.addEventListener('change', function(){
            radioInputs.forEach((elem)=>{
                if(localStorage.getItem(elem.id)) localStorage.removeItem(elem.id);
            });
            localStorage.setItem(this.value, true);
            collectionOptions.forEach((elem)=>{
                if(localStorage.getItem(elem.value)) typeTicketSpan.innerHTML = elem.innerHTML;
            });
            addPriceTickets();
            calc.initResult();
        })
    })
    //Validation
    phoneInput.addEventListener('keyup', phonePrintLine);
    phoneInput.addEventListener('change', phonePrintErrMessage);
    function phonePrintLine(e) {
        printErrorLine(this, true);
        if(checkPattern(patternObj.phone, this.value)){
            printErrorLine(this, false);
        }
    }
    function phonePrintErrMessage(e) {
        if(!checkPattern(patternObj.phone, this.value) && this.value.length > 0){
            createError();
        }
    }
    emailInput.addEventListener('keyup', emailPrintLine);
    emailInput.addEventListener('change', emailPrintErrMessage);
    function emailPrintLine(e) {
        printErrorLine(this, true);
        if(checkPattern(patternObj.email, this.value)){
            printErrorLine(this, false);
        }
    }
    function emailPrintErrMessage(e) {
        if(!checkPattern(patternObj.email, this.value) && this.value.length > 0){
            createError();
        }
    }
    nameInput.addEventListener('keyup', namePrintLine);
    nameInput.addEventListener('change', namePrintErrMessage);
    function namePrintLine(e) {
        printErrorLine(this, true);
        if(checkPattern(patternObj.name, this.value)){
            printErrorLine(this, false);
        }
    }
    function namePrintErrMessage(e) {
        if(!checkPattern(patternObj.name, this.value) && this.value.length > 0){
            createError();
        }
    }

}
alert('Самооценка доступна в консоле');
console.log(
    `
    Ваша оценка - 100 баллов 
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) при перелистывании слайдов кликами или свайпами меняется номер активного слайда 

2) если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание. Также проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда. В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно 

3) если внутри слайда проигрывается видео с YouTube, клик по стрелке перелистывания слайдов или клик по буллету останавливает проигрывание видео 

4) если основное видео проигрывалось при перелистывании слайдера, проигрывание видео останавливается, прогресс бар сдвигается к началу, иконки "Play" на панели управления и по центру видео меняются на первоначальные 

5) клавиша Пробел — пауза, при повторном нажатии - play 

6) Клавиша M (англ) — отключение/включение звука 

7) Клавиша F — включение/выключение полноэкранного режима 

8) Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика 

9) Клавиши SHIFT+. (англ) — замедление воспроизведения ролика 

10) ползунок можно перетягивать мышкой по горизонтали 

11) ползунок никогда не выходит за границы картины 

12) при перемещении ползунка справа налево плавно появляется нижняя картина 

13) при перемещении ползунка слева направо плавно появляется верхняя картина 

14) при обновлении страницы ползунок возвращается в исходное положение 

15) при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания. В качестве образца анимации используйте анимацию на сайте Лувра https://www.louvre.fr/ 

16) если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется 

17) при обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется 

18) когда пользователь выбирает дату в форме слева, она отображается в билете справа 

19) нельзя выбрать дату в прошлом 

20) когда пользователь выбирает время в форме слева, оно отображается в билете справа 

21) время можно выбирать с 9:00 до 18:00 с интервалом в 30 минут 

Частично выполненные пункты:
1) есть возможность перелистывания слайдов с видео влево и вправо кликами по стрелкам. Слайды перелистываются по одному, при этом также меняется основное видео 

2) есть возможность перелистывания слайдов кликами по буллетам (кружочки внизу слайдера), при этом также меняется основное видео 

3) валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы 

4) валидация e-mail должна пропукать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв 

5) Любой собственный дополнительный функционал, улучшающий качество проекта. Например, ночная тема, плавная смена изображений в блоке Tickets, всплывающее окно с информацией про картины и их авторов, кнопка прокрутки страницы вверх, возможность проголосовать за понравившиеся картины с сохранением данных в local storage, всё зависит от вашей фантазии и чувства вкуса. Для удобства проверки выполненный вами дополнительный функционал включите в самооценку, которую выведите в консоль браузера 

Выполненные пункты:
1) есть возможность перелистывания слайдов влево и вправо кликами по стрелкам 

2) есть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки 

3) есть возможность перелистывания слайдов кликами по буллетам (квадратики внизу слайдера) 

4) слайды перелистываются плавно с анимацией смещения вправо или влево 

5) перелистывание слайдов бесконечное (зацикленное) 

6) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

7) даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

8) при клике по самому слайду или кнопке Play в центре слайда, внутри слайда проигрывается видео с YouTube. Никакие изменения с основным видео при этом не происходят 

9) слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется) 

10) перелистывание слайдов бесконечное (зацикленное) 

11) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

12) даже при частых кликах по стрелкам нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

13) при клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

14) при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

15) прогресс-бар отображает прогресс проигрывания видео 

16) перетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео 

17) если прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок "Play" 

18) при клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка) 

19) при перемещении ползунка громкости звука изменяется громкость видео 

20) если ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой 

21) если при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой 

22) при нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима. Нажатие на клавишу для выхода из полноэкранного режима Esc не проверяем и не оцениваем 

23) панель управления в полноэкранном режиме визуально выглядит так же, как на макете - кнопки равномерно распределены по всей ширине страницы, относительные размеры между кнопками и ползунками, а также относительные размеры самих кнопок остались прежними 

24) при изменении количества билетов Basic и Senior пересчитывается общая цена за них 

25) у каждого типа билетов своя цена (20 €, 25 €, 40 € для Basic и половина этой стоимости для Senior). При изменении типа билета пересчитывается общая цена за них 

26) при обновлении страницы сохраняется выбранное ранее количество билетов Basic и Senior, выбранный тип билета, общая цена за них 

27) когда при клике по кнопке Buy now открывается форма, она уже содержит данные, указанные на странице сайта - количество билетов, их тип, общая цена за них 

28) можно изменить тип билета в поле Ticket type слева при этом меняется тип билета, цена билета и общая стоимость билетов справа 

29) можно изменить количество билетов каждого типа в поле слева при этом меняется количество билетов и общая стоимость билетов справа 

30) валидация номера телефона: номер содержит только цифры; без разделения или с разделением на две или три цифры; разделение цифр может быть через дефис или пробел; с ограничением по количеству цифр не больше 10 цифр 

31) при попытке ввода в форму невалидного значения выводится предупреждение, например, "номер телефона может содержать только цифры" 

32) в секции Contacts добавлена интерактивная карта 

33) на карте отображаются маркеры, расположение и внешний вид маркеров соответствует макету 

34) стиль карты соответствует макету 

Добавленный функционал: прокрутка слайдера в хедере идёт автоматически.
    `
)