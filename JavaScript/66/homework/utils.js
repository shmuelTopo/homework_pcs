window.contactList = window.contactList || {};

window.contactList.utils = (function (myModule) {
    'use strict';

    const listOfFirstNames = ['Lakeesha', 'Reda', 'Ma', 'Joe', 'Donald', 'Kamla', 'Samuel', 'David', 'Michel', 'Aron', 'Neoma', 'Artie', 'Rachel', 'Harry', 'Judi', 'Jonasan', 'Dinah', 'Dollie', 'Noreen', 'Zita', 'Kalyn', 'Yevette', 'Ronald', 'Joie', 'Gala', 'Stefany', 'Chaya', 'Mali', 'Benjemen', 'Morty', 'Tili', 'Chana', 'Jacky', 'Jung', 'Kim'];
    const listOfLastNames = ['Lurie', 'Reif', 'Munez', 'Trump', 'Biden', 'Harris', 'Apple', 'Kohn', 'Ragon', 'Ropous', 'Munez', 'Scoffild', 'Potter', 'Wisely', 'Dumbelder', 'Lucena', 'Rowling', 'Perrier', 'Shakespeare', 'Guider', 'Tapp', 'Chaps', 'Lodi', 'Mcgriff', 'Castlman', 'Reandes', 'Sowlinski', 'Kapolov', 'Snow', 'Mitchel', 'Thiry', 'Dressler', 'Deccar', 'Arana', 'Northern'];
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