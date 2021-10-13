(function(){
    'use strict';
    const header = $('<header></header>');
    header.append($('<p>Your Name is</p>'));
    const nameInfo = $('<p>unknown,</p>')
    nameInfo.addClass('unknown');
    header.append(nameInfo);

    header.append($('<p>Address</p>'));
    const addressInfo = $('<p>unknown</p>')
    addressInfo.addClass('unknown');

    header.append(addressInfo);

    $('body').append(header);

    const form = $('<form></form>');

    const labelName = $('<lable for="name"></lable>').text('Full Name');
    const inputName = $('<input id="name" type="text" placeholder="Type your Name...">');
    inputName.addClass('inputText')
    labelName.append(inputName);
    form.append(labelName);

    const lableAddress = $('<lable for="address"></lable>').text('Address');
    const inputAddress = $('<input id="address" type="text" placeholder="Type your Address...">');
    inputAddress.addClass('inputText')

    lableAddress.append(inputAddress);
    form.append(lableAddress);

    const submitArea = $('<div id="submitArea"></div>'); 
    const button = $('<button type="submit">Submit</button>');
    const labelCheckbox = $('<lable></lable>');
    const submitCheckbox = $('<input id="check" type="checkbox">'); 

    labelCheckbox.append(submitCheckbox);
    labelCheckbox.html(labelCheckbox.html() + 'Sure you want to Submit?');

    submitArea.append(button);
    submitArea.append(labelCheckbox);


    button.click((event) => {
        event.preventDefault();

        //Not sure why coudn't do it from JQuery
        if(document.getElementById('check').checked){
            const name = inputName.val() || 'unknown';
            const address = inputAddress.val() || 'unknown';

            nameInfo.text(name + ',');
            inputName.val("");

            addressInfo.text(address);
            inputAddress.val("")

            if(name == 'unknown'){
                nameInfo.addClass('unknown');
            } else {
                nameInfo.removeClass('unknown')
            }

            if(address == 'unknown'){
                addressInfo.addClass('unknown');
            } else {
                addressInfo.removeClass('unknown')
            }
        }
        
    })


    form.append(submitArea);

    $('body').append(form);

}())