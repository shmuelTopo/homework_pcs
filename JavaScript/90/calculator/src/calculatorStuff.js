
// eslint-disable-next-line import/no-anonymous-default-export
const calculatorStuff = {
    buttons : [
        {value: 'AC', styleClass: 'dark-btn', type: 'clear'},
        {value: '+/-', styleClass: 'dark-btn', type: 'plusMinus'},
        {value: '%', styleClass: 'dark-btn', type: 'percent'},
        {value: '/', show: "÷", styleClass: 'orange-btn', type: 'operator'},

        {value: 7, styleClass: 'light-btn', type: 'number'},
        {value: 8, styleClass: 'light-btn', type: 'number'},
        {value: 9, styleClass: 'light-btn', type: 'number'},
        {value: '*', show: '×', styleClass: 'orange-btn', type: 'operator'},

        {value: 4, styleClass: 'light-btn', type: 'number'},
        {value: 5, styleClass: 'light-btn', type: 'number'},
        {value: 6, styleClass: 'light-btn', type: 'number'},
        {value: '-', styleClass: 'orange-btn', type: 'operator'},

        {value: 1, styleClass: 'light-btn', type: 'number'},
        {value: 2, styleClass: 'light-btn', type: 'number'},
        {value: 3, styleClass: 'light-btn', type: 'number'},
        {value: '+', styleClass: 'orange-btn', type: 'operator'},

        {value: 0, styleClass: 'light-btn large', type: 'number'},
        {value: '.', styleClass: 'light-btn', type: 'dot'},
        {value: '=', styleClass: 'orange-btn', type: 'equal'},   
    ],

    getNumberToShowCalc: (num) => {
        const number = num.toString().length >= 11 ? Number(num).toExponential(5) : num;
        return numberWithCommas(number);
    },

    getSolution: (expression) => {
        // use eval safety by stripping anything from the expression beside all the numbers and the operators
        // eslint-disable-next-line no-eval
        return eval(expression.replace(/[^-()\d/*+.]/g, ''));
    }
}

function numberWithCommas(num){
    //Receive a number and return with formatted commas
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export default calculatorStuff;