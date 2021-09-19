window.shmuel = window.shmuel || {};

window.shmuel.messageBox = (function () {
    'use strict';


    //Adding the Boostrap css and the custom css style sheet from the Dom
    // document.getElementsByTagName("head")[0].insertAdjacentHTML(
    //     'beforeend',
    //     '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css">'
    //     );


    // document.getElementsByTagName("head")[0].insertAdjacentHTML(
    //     "beforeend",
    //     '<link rel="stylesheet" href="messageBox.css" />');


    //     alert('Hello');

    // Get HTML head element
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css';
    head.appendChild(link);

    function get(id) {
        return document.getElementById(id);
    }

    function setCss(element, property, value) {
        element.style[property] = value;
    }

    function addEvent(element, eventType, callback) {
        element.addEventListener(eventType, callback);
    }

    const bidenAlert = get('bidenAlert');
    const trumpAlert = get('trumpAlert');
    const messageBox = get('messageBox');



    function makeMessageBox(msg) {
        const messageBoxDiv = document.createElement('div');

        const messageBoxHtml = `
            <div id="messageBox" class="alert alert-success centered">
                    <h2 class="text-center">This is an Alert</h2>
                    <p id="messageText">${msg}</p>
                    <div class="text-center">
                        <button id="okButton" class=" btn btn-secondary">Ok</button>
                    </div>
                </div>
        `;

        messageBoxDiv.innerHTML = messageBoxHtml;
        document.body.appendChild(messageBoxDiv);
    }

    makeMessageBox("Hello world");

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


    return {
        show: 'showMessageBox'
    };
})();