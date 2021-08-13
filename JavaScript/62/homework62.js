'use strict';
const dayOfWeek = (function(){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Shaboos'];
    
    return {
        getDayName: (num) => {
            if(num < 1 || num > 7){
                return undefined;
            }
            return days[num-1];
        },

        getDayNumber: dayName => days.findIndex(e => e.toLowerCase() === dayName.toLowerCase())+1
    };
    
})();

console.log('dayOfWeek.getDayName(2) -->', dayOfWeek.getDayName(2));
console.log("dayOfWeek.getDayNumber('FRIDAY') -->", dayOfWeek.getDayNumber('FRIDAY'));


const interestCalculator = (function(){
    let interestRate = 0;
    let years = 0;
    return {
        calculate: (amountOfMoney) => {
            let interestMoney = 0;
            let moneyOwe = amountOfMoney;
            console.log(`On year 0: Yearly rate: $0, total interest: $${interestMoney}, You owe $${moneyOwe}`);
            for(let i = 0; i < years; i++){
                let yearlyInterest = Math.round(moneyOwe * interestRate);
                interestMoney += yearlyInterest;
                moneyOwe += yearlyInterest;
                console.log(`On year ${i + 1}: Yearly rate: $${yearlyInterest}, total interest: $${interestMoney}, You owe $${moneyOwe}`);
            }
            return interestMoney;
        },
        setYears: (yearsOfLoan) => years = yearsOfLoan,
        setRate: newRate => {
            if (newRate > 1) {
                interestRate = newRate / 100;
            } else if (newRate >= 0){
                interestRate = newRate;
            } // else do nothing
        } 
    };
}());

interestCalculator.setRate(0.02);
interestCalculator.setYears(10);
interestCalculator.calculate(10000);

