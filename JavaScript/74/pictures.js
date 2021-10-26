(function() {
    'use strict';

    const searchButton = $('#search button');
    const searchInput = $('#search input');
    
    
    $('#api button').click(() => {
        $('#api').remove();
        searchButton.attr('disabled', false);
        $('#search input').attr('disabled', false);
    });

    window.jsonFlickrFeed = function(json) {    
        window.theData = json;
        updateDom(window.theData);
    };
    
    $('form').submit((e) => {  
        e.preventDefault();
        $.ajax({
            url: 'https://api.flickr.com/services/feeds/photos_public.gne',
            dataType: 'jsonp',
            data: {
                "tags": searchInput.val(),
                "format": "json"
            }
        });
    });

    function updateDom(data){
        $('#picturesWrapper').empty();
        data.items.forEach((pic) => {
            // $('#picturesWrapper').append(`<div class="picture"><p>${pic.title}</p><img src="${pic.media.m}"></div>`);
            const image = $(`<li class="picture"><p>${pic.title}</p><img src="${pic.media.m}"></li>`);
            image.find('p').hide();
            image.find('img').hover(
                () => image.find('p').show(),
                () => image.find('p').hide()
            );
            $('#picturesWrapper').append(image);

        });
    }

})();


/*
https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={APIKEY}&tags={TAG}&format=json&nojsoncallback={callback}":
https://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpg
*/