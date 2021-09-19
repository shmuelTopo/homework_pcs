window.shmuel = window.shmuel || {};

window.shmuel.messageBox = (function () {
    'use strict';

    const offsetIncrement = 10;
    let leftOffset = -150;
    let topOffset = -125;
    const width = 300;
    const height = 250;
    let nextZIndex = 1;
    const model = document.createElement('div');
    model.classList.add('model');
    document.body.appendChild(model);
    const head = document.getElementsByTagName('HEAD')[0];
    
    //Add the Css from JavaScript
    const customCss = document.createElement('link');
    customCss.rel = 'stylesheet';
    customCss.href = 'messageBox.css';
    

    head.appendChild(customCss);

    function get(id) {
        return document.getElementById(id);
    }

    function setCss(element, property, value) {
        element.style[property] = value;
    }

    function addEvent(element, eventType, callback) {
        element.addEventListener(eventType, callback);
    }

    function showMessageBox(msg, isModel, options, callback) {
        if(isModel){
            model.style.display = 'block';
            model.style.zIndex = nextZIndex++;
        }
        
        const messageBoxDiv = document.createElement('div');
        messageBoxDiv.classList.add('box');
        messageBoxDiv.style.width = `${width}px`;
        messageBoxDiv.style.height = `${height}px`;
        messageBoxDiv.style.position = 'absolute';
        messageBoxDiv.style.top = '50%';
        messageBoxDiv.style.left = '50%';
        messageBoxDiv.style.marginTop = `${topOffset}px`;
        messageBoxDiv.style.marginLeft = `${leftOffset}px`;
        messageBoxDiv.style.zIndex = nextZIndex++;

        addEvent(messageBoxDiv, 'click', () => messageBoxDiv.style.zIndex = nextZIndex++);

        const boxHeading = document.createElement('h2');
        boxHeading.innerHTML = 'Alert';
        const message = document.createElement('span');
        message.innerText = msg;

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonDiv');
        
        if(Array.isArray(options)){
            options.forEach((element) => {
                const newButton = document.createElement('button');
                let textToDispaly;
                if (typeof element === 'string' || element instanceof String){
                    //Slice the string if the option if bigger than 20 characters
                    textToDispaly = element.slice(0, 20);
                } else {
                    textToDispaly = 'unknown';
                }
                newButton.innerText = textToDispaly;
                addEvent(newButton, 'click', () => {
                    messageBoxDiv.remove();
                    model.style.display = 'none';
                    if(callback){
                        callback(textToDispaly)
                    }
                });
                buttonDiv.appendChild(newButton)
            });
        } else {
            const okButton = document.createElement('button');
            okButton.innerText = 'ok';
            buttonDiv.appendChild(okButton); 

            addEvent(okButton, 'click', () => {
                messageBoxDiv.remove();
                model.style.display = 'none';
            });
        }
        

        messageBoxDiv.appendChild(boxHeading);
        messageBoxDiv.appendChild(message);
        messageBoxDiv.appendChild(buttonDiv);

        document.body.appendChild(messageBoxDiv);

        topOffset += offsetIncrement;
        leftOffset += offsetIncrement;


        let topPosition = parseFloat(getComputedStyle(messageBoxDiv).top);
        let leftPosition = parseFloat(getComputedStyle(messageBoxDiv).left)
        
        if (topPosition + topOffset + height > window.innerHeight) {
            topOffset -= window.innerHeight - height;
        }
    
        if (leftPosition + leftOffset + width > window.innerWidth) {
            leftOffset -= window.innerWidth - width;
        }

    }

    return {
        show: showMessageBox
    };
})();