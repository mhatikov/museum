class CalcTickets{
    constructor(conclusionElement){
        if(conclusionElement instanceof Element) this._resultElement = conclusionElement;
    }

    _PRICERADIO = {
        tickets_type_1: 20,
        tickets_type_2: 25,
        tickets_type_3: 40
    }

    initialization(){
        this._result = 0;
        this._radioInput = '';
        this._basicTickets = 0;
        this._seniorTickets = 0;
    }

    _setCheckedInput(){
        for(let type in this._PRICERADIO){
            if(localStorage.getItem(type)) this._radioInput = type;
        }
        if(this._radioInput == false) alert('Пожалуйста, выберите тип билета');
    }

    _setBasicTickets(){
        if(localStorage.getItem('basic_18')) this._basicTickets = localStorage.getItem('basic_18');
    }

    _setSeniorTickets(){
        if(localStorage.getItem('senior_18')) this._seniorTickets = localStorage.getItem('senior_18');
    }

    initResult(){
        this._setCheckedInput();
        this._setBasicTickets();
        this._setSeniorTickets();
        let input = this._radioInput;
        this._result = (+this._basicTickets * +this._PRICERADIO[input]) + (+this._seniorTickets * Math.floor(+this._PRICERADIO[input] / 2));
        this._resultElement.innerHTML = this._result + '€';
        localStorage.setItem('amount-price', this._result);
        this.initialization();
    }

    initPriceOneTicket(parentElem, typeTicket, initMultiplication){
        if(typeof typeTicket !== 'string' || (typeTicket !== 'senior' && typeTicket !== 'basic')){
            throw new Error('not a string or valid');
        }
        this._setCheckedInput();
        let input = this._radioInput;
        if(!initMultiplication){
            parentElem.textContent = typeTicket === 'basic' ? this._PRICERADIO[input] + ' €':
            Math.floor(+this._PRICERADIO[input] / 2) + ' €';
        }else{
            this._setBasicTickets();
            this._setSeniorTickets();
            parentElem.textContent = typeTicket === 'basic' ? (+this._basicTickets * this._PRICERADIO[input]) + ' €':
            (+this._seniorTickets * Math.floor(+this._PRICERADIO[input] / 2)) + ' €';
        }
    }
}