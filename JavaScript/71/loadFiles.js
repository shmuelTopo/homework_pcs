(function() {
    'use strict';
    let count = 0;
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
                    <div>
                        <h3>File number ${++count}</h3>
                        ${fileText}
                    </div>
                    <hr>
                `));

                
            }

        } catch (error){
            alert(error.name, error.message);
        }
    });

})();