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
                alert('?????????????? ?????????? ???????????? 20, ???? ???????????? ????????');
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
    alert('????????????????????, ?????????????? ???????????????????? ????????????????');
}
if(buyNowBtn){
    let patternObj = new Object();
    patternObj.phone = /^\+?[0-9]{0,1}\(?[0-9]{0,5}\)?[0-9]+$/;
    patternObj.email = /^.+@.+\..{2,3}$/;
    patternObj.name = /^[a-zA-Z??-????????-?? ]{3,15}$/
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
                alert('?????????????? ?????????? ???????????? 20, ???? ???????????? ????????');
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
alert('???????????????????? ???????????????? ?? ??????????????');
console.log(
    `
    ???????? ???????????? - 100 ???????????? 
?????????? ???? ?????????????? ????:
???? ??????????????????????/???? ?????????????????????? ????????????:
1) ?????? ???????????????????????????? ?????????????? ?????????????? ?????? ???????????????? ???????????????? ?????????? ?????????????????? ???????????? 

2) ???????? ?????????? ?? YouTube ??????????????????????????, ???????? ???? ???????????? Pause ?????????????????????????? ?????? ????????????????????????. ?????????? ???????????????????????? ?????????? ??????????????????????????????, ???????? ???????????????? ???? ?????????????? ???????????? ?????? ???????????? Play ?? ???????????? ?????????????? ????????????. ?? ?????????????????? ???????????????? ???????????? ?????????? ???????????? ??????????????????????, ?? ?????????????? ????????????????????????. ???????????????????? ???????????????????????? ???????????????????? YouTube ?????????? ???????????????????????? 

3) ???????? ???????????? ???????????? ?????????????????????????? ?????????? ?? YouTube, ???????? ???? ?????????????? ???????????????????????????? ?????????????? ?????? ???????? ???? ?????????????? ?????????????????????????? ???????????????????????? ?????????? 

4) ???????? ???????????????? ?????????? ?????????????????????????? ?????? ???????????????????????????? ????????????????, ???????????????????????? ?????????? ??????????????????????????????, ???????????????? ?????? ???????????????????? ?? ????????????, ???????????? "Play" ???? ???????????? ???????????????????? ?? ???? ???????????? ?????????? ???????????????? ???? ???????????????????????????? 

5) ?????????????? ???????????? ??? ??????????, ?????? ?????????????????? ?????????????? - play 

6) ?????????????? M (????????) ??? ????????????????????/?????????????????? ?????????? 

7) ?????????????? F ??? ??????????????????/???????????????????? ???????????????????????????? ???????????? 

8) ?????????????? SHIFT+, (????????) ??? ?????????????????? ?????????????????????????????? ???????????? 

9) ?????????????? SHIFT+. (????????) ??? ???????????????????? ?????????????????????????????? ???????????? 

10) ???????????????? ?????????? ???????????????????????? ???????????? ???? ?????????????????????? 

11) ???????????????? ?????????????? ???? ?????????????? ???? ?????????????? ?????????????? 

12) ?????? ?????????????????????? ???????????????? ???????????? ???????????? ???????????? ???????????????????? ???????????? ?????????????? 

13) ?????? ?????????????????????? ???????????????? ?????????? ?????????????? ???????????? ???????????????????? ?????????????? ?????????????? 

14) ?????? ???????????????????? ???????????????? ???????????????? ???????????????????????? ?? ???????????????? ?????????????????? 

15) ?????? ?????????????????? ???????????????? ???????? ?????????????????? ???????????? ???????????? Galery ???????????????????????????? ??????????????????: ?????????????????????? ???????????? ?????????????????????? ?????????? ??????????, ???????????????????????? ?? ???????????????? ???????????? ????????????????????. ?? ???????????????? ?????????????? ???????????????? ?????????????????????? ???????????????? ???? ?????????? ?????????? https://www.louvre.fr/ 

16) ???????? ???????????????????? ???????????????? ?????????? ?? ?????????? ?????????? ???????????????????????? ????????, ???????????????? ?????????????????? ???????????? ?????????????????????? 

17) ?????? ???????????????????? ????????????????, ???????? ?????? ?? ???????? ?????????????? ???????? ???????????????????? ???? ???????????? Galery, ???????????????? ???????????? ?????????????????????? 

18) ?????????? ???????????????????????? ???????????????? ???????? ?? ?????????? ??????????, ?????? ???????????????????????? ?? ???????????? ???????????? 

19) ???????????? ?????????????? ???????? ?? ?????????????? 

20) ?????????? ???????????????????????? ???????????????? ?????????? ?? ?????????? ??????????, ?????? ???????????????????????? ?? ???????????? ???????????? 

21) ?????????? ?????????? ???????????????? ?? 9:00 ???? 18:00 ?? ???????????????????? ?? 30 ?????????? 

???????????????? ?????????????????????? ????????????:
1) ???????? ?????????????????????? ???????????????????????????? ?????????????? ?? ?????????? ?????????? ?? ???????????? ?????????????? ???? ????????????????. ???????????? ?????????????????????????????? ???? ????????????, ?????? ???????? ?????????? ???????????????? ???????????????? ?????????? 

2) ???????? ?????????????????????? ???????????????????????????? ?????????????? ?????????????? ???? ???????????????? (???????????????? ?????????? ????????????????), ?????? ???????? ?????????? ???????????????? ???????????????? ?????????? 

3) ?????????????????? ?????????? ????????????????????????. ?????? ???????????????????????? ???????????? ?????????????????? ???? 3 ???? 15 ????????????????, ?? ???????????????? ???????????????? ?????????? ???????? ???????????????????????? ?????????? ?????????????????????? ?????? ???????????????? ???????????????? ?? ???????????? ?????? ?????????????? ???????????????? ?? ?????????????? 

4) ?????????????????? e-mail ???????????? ?????????????????? ???????????? ???????????? ???????? username@example.com, ??????: username - ?????? ????????????????????????, ???????????? ?????????????????? ???? 3 ???? 15 ???????????????? (??????????, ??????????, ???????? ??????????????????????????, ??????????), ???? ???????????? ?????????????????? ????????????????; @ - ???????????? ??????????????; example - ?????????? ?????????????? ???????????? ?????????????? ?????????????? ???? 4 ?????????????????? ????????; com - ?????????? ???????????????? ????????????, ???????????????????? ???? ???????????? ?????????????? ???????????? ???????????? ?? ?????????????? ?????????????? ???? 2 ?????????????????? ???????? 

5) ?????????? ?????????????????????? ???????????????????????????? ????????????????????, ???????????????????? ???????????????? ??????????????. ????????????????, ???????????? ????????, ?????????????? ?????????? ?????????????????????? ?? ?????????? Tickets, ?????????????????????? ???????? ?? ?????????????????????? ?????? ?????????????? ?? ???? ??????????????, ???????????? ?????????????????? ???????????????? ??????????, ?????????????????????? ?????????????????????????? ???? ?????????????????????????? ?????????????? ?? ?????????????????????? ???????????? ?? local storage, ?????? ?????????????? ???? ?????????? ???????????????? ?? ?????????????? ??????????. ?????? ???????????????? ???????????????? ?????????????????????? ???????? ???????????????????????????? ???????????????????? ???????????????? ?? ????????????????????, ?????????????? ???????????????? ?? ?????????????? ???????????????? 

?????????????????????? ????????????:
1) ???????? ?????????????????????? ???????????????????????????? ?????????????? ?????????? ?? ???????????? ?????????????? ???? ???????????????? 

2) ???????? ?????????????????????? ???????????????????????????? ?????????????? ?????????? ?? ???????????? ???????????????? (????????????????????) ?????????? 

3) ???????? ?????????????????????? ???????????????????????????? ?????????????? ?????????????? ???? ???????????????? (???????????????????? ?????????? ????????????????) 

4) ???????????? ?????????????????????????????? ???????????? ?? ?????????????????? ???????????????? ???????????? ?????? ?????????? 

5) ???????????????????????????? ?????????????? ?????????????????????? (??????????????????????) 

6) ?????? ???????????????????????????? ?????????????? ???????????? ?????????????????? ???????????? ???????????????????????????? (???????????????????? ????????????) 

7) ???????? ?????? ???????????? ???????????? ?????? ?????????????? ?????? ????????????????, ?????????? ?????????? ?????????? ???????????????????????????? ?????????????????? ???? ???? ????????????, ?????? ????????????????, ?????????? ?????????? ???????????????????????? ?????? ???????????? 

8) ?????? ?????????? ???? ???????????? ???????????? ?????? ???????????? Play ?? ???????????? ????????????, ???????????? ???????????? ?????????????????????????? ?????????? ?? YouTube. ?????????????? ?????????????????? ?? ???????????????? ?????????? ?????? ???????? ???? ???????????????????? 

9) ???????????? ?????????????????????????????? ???????????? ?? ?????????????????? ???????????????? ???????????? ?????? ?????????? (?????? ?????????? ?????????????????? ?????????? ???????????????? ???????????????? ???? ?????????????????? ?? ???? ??????????????????????) 

10) ???????????????????????????? ?????????????? ?????????????????????? (??????????????????????) 

11) ?????? ???????????????????????????? ?????????????? ???????????? ?????????????????? ???????????? ???????????????????????????? (???????????????????? ????????????) 

12) ???????? ?????? ???????????? ???????????? ???? ???????????????? ?????? ????????????????, ?????????? ?????????? ?????????? ???????????????????????????? ?????????????????? ???? ???? ????????????, ?????? ????????????????, ?????????? ?????????? ???????????????????????? ?????? ???????????? 

13) ?????? ?????????? ???? ???????????? "Play" ?????????? ?????????? ???? ???????????? ?????????? ???????????????????? ???????????????????????? ??????????, ???????????? ???????????? ?????? ???????? ???????????????? ???? "Pause", ?????????????? ???????????? "Play" ???? ???????????? ?????????? ????????????????. ?????????????????? ???????? ???? ???????????? ?????????????????????????? ???????????????????????? ??????????, ???????????? ???????????????? ???? ????????????????????????????, ?????????????? ???????????? "Play" ???? ???????????? ?????????? ?????????? ???????????????????????? 

14) ?????? ?????????? ???? ?????????????? ???????????? "Play" ???? ???????????? ??????????, ?????? ?????? ?????????? ???? ???????????? ??????????, ???????????????????? ???????????????????????? ??????????, ???????????? ???????????? "Play" ?????????? ?????????? ???? ???????????? ?????????? ???????????????? ???? "Pause", ?????????????? ???????????? "Play" ???? ???????????? ?????????? ????????????????. ???????? ???? ??????????, ?????????????? ??????????????????????????, ?????????????????????????? ???????????????????????? ??????????, ???????????? ???????????? "Play" ?????????? ?????????? ???? ???????????? ?????????? ???????????????? ???? ????????????????????????????, ?????????????? ???????????? "Play" ???? ???????????? ?????????? ?????????? ???????????????????????? 

15) ????????????????-?????? ???????????????????? ???????????????? ???????????????????????? ?????????? 

16) ?????????????????????????? ???????????????? ????????????????-???????? ?????????????????? ???????????????? ?????????? ?? ???????????????? ?????????????????????????? ?????????? 

17) ???????? ????????????????-?????? ???????????????????? ???? ??????????, ?????????? ??????????????????????????????, ????????????????????????????, ???????????????? ?????????????? ?????? ???????????? "Play" 

18) ?????? ?????????? ???? ???????????? ???????????????? ???????????????????? toggle ?????????? ?? ?????????? ???????????? (???????? ???????????????????? ?????? ??????????????????????, ???????????????????????????? ???????????????????? ????????????) 

19) ?????? ?????????????????????? ???????????????? ?????????????????? ?????????? ???????????????????? ?????????????????? ?????????? 

20) ???????? ???????????????? ?????????????????? ?????????? ???????????????????? ???? 0, ???????? ??????????????????????, ???????????? ???????????????? ???????????????????? ?????????????????????? 

21) ???????? ?????? ?????????????????????? ???????????????? ???????????????????? ???????????????? ?????????????????? ?????????? ???? 0, ???????? ????????????????????, ???????????? ?????????????????? ?????????????????? ???????? ?????????????????????? 

22) ?????? ?????????????? ???? ???????????? fullscreen ?????????? ?????????????????? ?? ?????????????????????????? ??????????, ?????? ???????? ?????????? ?? ???????????? ???????????????????? ?????????????????????????????? ???? ???????? ??????????. ?????? ?????????????? ???? ???????????? fullscreen ???????????????? ?????????? ?????????????? ???? ???????????????????????????? ????????????. ?????????????? ???? ?????????????? ?????? ???????????? ???? ???????????????????????????? ???????????? Esc ???? ?????????????????? ?? ???? ?????????????????? 

23) ???????????? ???????????????????? ?? ?????????????????????????? ???????????? ?????????????????? ???????????????? ?????? ????, ?????? ???? ???????????? - ???????????? ???????????????????? ???????????????????????? ???? ???????? ???????????? ????????????????, ?????????????????????????? ?????????????? ?????????? ???????????????? ?? ????????????????????, ?? ?????????? ?????????????????????????? ?????????????? ?????????? ???????????? ???????????????? ???????????????? 

24) ?????? ?????????????????? ???????????????????? ?????????????? Basic ?? Senior ?????????????????????????????? ?????????? ???????? ???? ?????? 

25) ?? ?????????????? ???????? ?????????????? ???????? ???????? (20 ???, 25 ???, 40 ??? ?????? Basic ?? ???????????????? ???????? ?????????????????? ?????? Senior). ?????? ?????????????????? ???????? ???????????? ?????????????????????????????? ?????????? ???????? ???? ?????? 

26) ?????? ???????????????????? ???????????????? ?????????????????????? ?????????????????? ?????????? ???????????????????? ?????????????? Basic ?? Senior, ?????????????????? ?????? ????????????, ?????????? ???????? ???? ?????? 

27) ?????????? ?????? ?????????? ???? ???????????? Buy now ?????????????????????? ??????????, ?????? ?????? ???????????????? ????????????, ?????????????????? ???? ???????????????? ?????????? - ???????????????????? ??????????????, ???? ??????, ?????????? ???????? ???? ?????? 

28) ?????????? ???????????????? ?????? ???????????? ?? ???????? Ticket type ?????????? ?????? ???????? ???????????????? ?????? ????????????, ???????? ???????????? ?? ?????????? ?????????????????? ?????????????? ???????????? 

29) ?????????? ???????????????? ???????????????????? ?????????????? ?????????????? ???????? ?? ???????? ?????????? ?????? ???????? ???????????????? ???????????????????? ?????????????? ?? ?????????? ?????????????????? ?????????????? ???????????? 

30) ?????????????????? ???????????? ????????????????: ?????????? ???????????????? ???????????? ??????????; ?????? ???????????????????? ?????? ?? ?????????????????????? ???? ?????? ?????? ?????? ??????????; ???????????????????? ???????? ?????????? ???????? ?????????? ?????????? ?????? ????????????; ?? ???????????????????????? ???? ???????????????????? ???????? ???? ???????????? 10 ???????? 

31) ?????? ?????????????? ?????????? ?? ?????????? ?????????????????????? ???????????????? ?????????????????? ????????????????????????????, ????????????????, "?????????? ???????????????? ?????????? ?????????????????? ???????????? ??????????" 

32) ?? ???????????? Contacts ?????????????????? ?????????????????????????? ?????????? 

33) ???? ?????????? ???????????????????????? ??????????????, ???????????????????????? ?? ?????????????? ?????? ???????????????? ?????????????????????????? ???????????? 

34) ?????????? ?????????? ?????????????????????????? ???????????? 

?????????????????????? ????????????????????: ?????????????????? ???????????????? ?? ???????????? ???????? ??????????????????????????.
    `
)