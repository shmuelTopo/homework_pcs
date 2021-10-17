(function(){
    'use strict';

    const agreeCheckbox = $('#agree');

    agreeCheckbox.change(function (e) { 
        e.preventDefault();
        $('#theButton').prop('disabled', !agreeCheckbox.prop('checked'));
    });

    const nameInput = $('#fullName');
    const nameDisplay = $('#nameDisplay');

    const addressInput = $('#address');
    const addressDisplay = $('#addressDisplay');

    $('#theButton').click((event) => {
        event.preventDefault();

        const name = nameInput.val() || 'unknown';
        const address = addressInput.val() || 'unknown';
        
        nameDisplay.text(name);
        nameInput.val("");

        addressDisplay.text(address);
        addressInput.val("");

        if(name === 'unknown'){
            nameDisplay.addClass('unknown');
        } else {
            nameDisplay.removeClass('unknown');
        }

        if(address === 'unknown'){
            addressDisplay.addClass('unknown');
        } else {
            addressDisplay.removeClass('unknown');
        }
        
    });

}());