(function() {
    'use strict';
    let count = 0;

    $('form input').val('potter.txt');

    $('form').submit(async function(e) { 
        e.preventDefault();
        
        const fileName = $('form input').val();

        let response;
        try {
            response = await fetch(fileName); 
            
            if (!response.ok) {
                alert(`${response.status} ${response.statusText}`);
            } else {
                const fileText = await response.text();
                console.log('doing it');
                $(document.body).append($(`
                <h3>File number ${++count}</h3>
                <textarea>
                        ${fileText}
                    </textarea>
                    <hr>
                `));

            }

        } catch (error){
            alert(error.name, error.message);
        }
    });

    function getTextWithNewLines(text){
        let textWitNewLines = '';
        for(let char of text){
            if(char === '\n'){
                textWitNewLines += '<br>';
                console.log('found', char);
            } else {
                textWitNewLines += char;
            }
        }
        console.log(text);
        return textWitNewLines;

    }

})();