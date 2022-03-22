/*global pcs */

(function(){
    'use strict';

    const zipInput = $('#zip');
    const langSelect = $('#lang');
    const tempSelect = $('#temp');
    const addCity = $('#addCity');
    const appId = '4e013f6fa12ece3b83bf10a0900c8020';

    const settings = {
        units: 'imperial',
        lang: 'en',
        zip: '00000'
    };

    let unitSymble = '°F';

    langSelect.change(() => { 
        settings.lang = $( "#lang option:selected" ).attr('value');
    });

    tempSelect.change(() => { 
        settings.units = $("#temp option:selected" ).attr('value');
        unitSymble = `°${$("#temp option:selected" ).text()[0]}`;
        console.log(unitSymble);
    });

    zipInput.change(() => { 
        settings.zip = zipInput.val().trim();
    });

    addCity.click(async () => { 
        zipInput.val('');
        try {
            console.log(`https://api.openweathermap.org/data/2.5/weather?zip=${settings.zip}&appid=${appId}&units=${settings.units}&lang=${settings.lang}`);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${settings.zip}&appid=${appId}&units=${settings.units}&lang=${settings.lang}`);
            // if(!response.ok){
            //     //To be changed with massagebox
            //     throw new Error('Please enter a correct zip code');
            // }
            const data = await response.json();
            console.log(data);
            const weatherCard = $(`
                <div class="card">
                    <button class="x">❌</button>
                    <h3>${data.name}</h3>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                    <p>${data.weather[0].description}</p>
                    <p>${Math.round(data.main.temp * 10) / 10} ${unitSymble}</p>
                </div>
            `);
            weatherCard.find('button').click(() => weatherCard.remove());
            $('#citiesContainer').append(weatherCard);
        } catch (e) {
            //To be changed with massagebox
            if(e.message === 'Failed to fetch'){
                pcs.messageBox.show('Faild to fetch weather information',true);
            } else {
                pcs.messageBox.show(e, true);
            }
        }
          
    });


})();