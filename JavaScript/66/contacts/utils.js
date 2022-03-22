window.contactList = window.contactList || {};

window.contactList.utils = (function (myModule) {
    'use strict';

    const listOfFirstNames = ['Lakeisha', 'Rede', 'Ma', 'Joe', 'Donald', 'Kamala', 'Samuel', 'David', 'Michel', 'Aron', 'Noma', 'Artie', 'Rachel', 'Harry', 'Judi', 'Jonathan', 'Dinah', 'Dollie', 'Noreen', 'Zeta', 'Kalyan', 'Cuvette', 'Ronald', 'Joie', 'Gala', 'Stefanie', 'Chaya', 'Mali', 'Benjamin', 'Marty', 'Tili', 'Chana', 'Jacky', 'Jung', 'Kim'];
    const listOfLastNames = ['Luria', 'Reify', 'Munoz', 'Trump', 'Biden', 'Harris', 'Apple', 'Kahn', 'Radon', 'Robots', 'Munoz', 'Snowfield', 'Potter', 'Wisely', 'Dumbledore', 'Lucent', 'Rowling', 'Perrier', 'Shakespeare', 'Guider', 'Taps', 'Chaps', 'Lodi', 'McGraw', 'Castellan', 'Renames', 'Stalinsk', 'Kapoks', 'Snow', 'Mitchel', 'Dressier', 'Decca', 'Arena', 'Northern'];
    const mailDomains = ['gmail.com', 'mail.com', 'mail.org', 'whitehouse.gov', 'mail.co.il', 'yahoo.com'];
    
    myModule.getRandomPerson = () => {
        let person = [];
        let randomFirstIndex = Math.floor(Math.random() * listOfFirstNames.length);
        let randomLastIndex = Math.floor(Math.random() * listOfLastNames.length);

        person.push(listOfFirstNames[randomFirstIndex]);
        person.push(listOfLastNames[randomLastIndex]);
        person.push(myModule.getEmailFromName(person[0], person[1]));
        person.push(myModule.getRandomPhone());

        return person;
    };

    myModule.getEmailFromName = (first, last) => {
        let isFirst = (Math.random() * 2 > 1);
        let isLast = (Math.random() * 2 > 1);
        if(!isFirst){
            isLast = true;
        }
        let isNumber = (!isFirst || !isLast);
        if (!isNumber) {
            isNumber = ((Math.random() * 2) > 1.8);
        }

        let number = Math.floor(Math.random() * 10000);
        let email = '';

        if (Math.random() * 2 > 1) {
            if(isLast){
                email = last.toLowerCase();
                if(isFirst){
                    if (Math.random() * 2 > 1 && isNumber) {
                        email = email + `${number}${first.toLowerCase()}`;
                    } else {
                        email = email + first.toLowerCase();
                        if (isNumber) {
                            email = email + `${number}`;
                        }
                    }
                } else {
                    email = email + `${number}`;
                }
            } else {
                email = email + first.toLowerCase();
                email = email + `${number}`;
            }
        } else {
            if (isFirst) {
                email = first.toLowerCase();
                if (isLast) {
                    if (Math.random() * 2 > 1 && isNumber) {
                        email = email + `${number}`;
                        email = email + last.toLowerCase();
                    } else {
                        email = email + last.toLowerCase();
                        if (isNumber) {
                            email = email + `${number}`;
                        }
                    }
                } else {
                    email = email + `${number}`;
                }
            } else {
                email = email + last.toLowerCase();
                email = email + `${number}`;
            }
        }

        let randomEmailIndex = Math.floor(Math.random() * mailDomains.length);
        email = email + `@${mailDomains[randomEmailIndex]}`;
        return email;
    };

    myModule.getRandomPhone = () => {
        let phone = '';
        let firstDigits = Math.floor(Math.random() * 999);
        let middleDigits = Math.floor(Math.random() * 999);
        let lastDigits = Math.floor(Math.random() * 999);

        if(firstDigits < 10){
            phone += `01${firstDigits}-`;
        } else if(firstDigits < 100){
            phone += `0${firstDigits}-`;
        } else {
            phone += `${firstDigits}-`;
        }

        if (middleDigits < 10) {
            phone += `00${middleDigits}-`;
        } else if (middleDigits < 100) {
            phone += `0${middleDigits}-`;
        } else {
            phone += `${middleDigits}-`;
        }

        if (lastDigits < 10) {
            phone += `000${lastDigits}`;
        } else if (lastDigits < 100) {
            phone += `00${lastDigits}`;
        } else if (lastDigits < 1000) {
            phone += `0${lastDigits}`;
        } else {
            phone += `${lastDigits}`;
        }
        return phone;

    };

    return myModule;

})(window.contactList.utils || {});