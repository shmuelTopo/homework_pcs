/*globals google*/

(async function() {
    'use strict';
    let pcsLocation = { lat: 40.108847085561855, lng: -74.21764970472604 };
    let map;

    function initializeMap(location){
        map = new google.maps.Map($('#map')[0], {
            center: location,
            zoom: 14
        });
    }



    async function searchPlaces(searchTerm, maxRows=10){
        try {
            let response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${searchTerm}&maxRows=${maxRows}&username=shmueltopo&type=json`);
            const locations = await response.json();
            console.log('locations', locations);
            
            return locations.geonames.map(e => {
                return {
                    location: {lat: e.lat, lng: e.lng},
                    title: e.title,
                    summary: e.summary,
                    url: e.wikipediaUrl,
                    img: e.thumbnailImg
                };
            });

        } catch(e){
            console.error(e);
        }
    }

    //Set Position to current location, if user refuse set location to default  
    function gotCurrentLocation(pos) {
        const crd = pos.coords;
        initializeMap({lat: crd.latitude, lng: crd.longitude});
    }
      
    function error(err) {
        console.error(`ERROR(${err.code}): ${err.message}`);
        initializeMap(pcsLocation);
    }
      
    navigator.geolocation.getCurrentPosition(gotCurrentLocation, error);

    //Add Event to search
    const markers = [];
    
    $('#search').click(async () => {
        const places = await searchPlaces($('input').val(), 10);
        const bounds = new google.maps.LatLngBounds();
        
        
        $('#places').empty();
        
        markers.forEach(marker => {
            marker.setMap(null);
        });

        markers.length = 0;

        places.forEach((e) => {
            console.log(e.img);
            
            bounds.extend(e.location);
            const contentString = `
                <h3>${e.title}</h3>
                <p>${e.summary}</p>
                <a target=”_blank” href="https://${e.url}">wikipedia</a>
            `;
            const infowindow = new google.maps.InfoWindow({
                content: contentString,
            });

            const marker = new google.maps.Marker({
                position: e.location,
                map: map,
                title: e.title,
                icon: {
                    url: e.img,
                    scaledSize: new google.maps.Size(50, 50)
                  }
            });
            
            marker.addListener("click", () => {
                infowindow.open({
                  anchor: marker,
                  map,
                  shouldFocus: false,
                });
            });

            markers.push(marker);

            $(`
                <div class="place-card">
                    <h3>${e.title}</h3>
                    <p>${e.summary.slice(0, 80)}...</p>
                    <a target=”_blank” href="https://${e.url}">wikipedia</a>
                </div>
            `).appendTo($('#places')).click(function() {
                map.panTo(e.location);
                map.setZoom(12);
            });
        });

        map.fitBounds(bounds);        

    });

    


    

})();