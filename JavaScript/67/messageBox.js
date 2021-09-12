(function () {
    'use strict';

    function get(id) {
        return document.getElementById(id);
    }

    function setCss(element, property, value){
        element.style[property] = value;
    }

    function addEvent(element, eventType, callback){
        element.addEventListener(eventType, callback);
    }

    const bidenAlert = get('bidenAlert');
    const trumpAlert = get('trumpAlert');
    const messageBox = get('messageBox');


    
    window.messageBox = {
        show: (messageText) => {
            if(!messageText){
                messageText = 'no text has been submitted';
            }
            get('messageText').innerText = messageText;
            setCss(messageBox, 'display', 'block');
        },
        hide: () => setCss(messageBox, 'display', 'none')
    };

    addEvent(bidenAlert, 'click', () => {
        window.messageBox.show('Due to the pandamic all employeess that are not vecenaied will be fired on spot, and send to jail for 5 months, and will require to pay a fine of $100,000 to the Binden administrator, texes and fee are not included.');
    });

    addEvent(trumpAlert, 'click', () => {
        window.messageBox.show('We will never give up!!!');
    });

    addEvent(get('okButton'), 'click', () => {
        window.messageBox.hide();
    });

    addEvent(get('customAlert'), 'submit', (event) => {
        event.preventDefault();
        let alertText = get('customAlertText');
        window.messageBox.show(alertText.value);
        alertText.value = '';
    });
})();