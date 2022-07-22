(async function() {
    'use strict';
    
    async function loadVideos(){
        try {
            const r = await fetch('videos.json');
            if(!r.ok){
                console.log('hihihih');
                throw new Error(`${r.status} ${r.statusText}`);
            } else {
                return await r.json();
            }
        } catch(e) {
            console.error(e);
        } 
    }

    const videos = await loadVideos();
    const videoList = $('#sidebar');
    const videoElem = $('#video');

    let activeVideo;
    videos.forEach(video => {
        const list = $(`<li>
            <p>${video.title}</p>
            <img src="${video.img}">
        </li>`).appendTo(videoList).click(() => {
            if(activeVideo){
                activeVideo.addClass('watched'); 
            }
            $('.active').removeClass('active');

            videoElem.attr('src', video.url);
            videoElem.attr('controls', true);

            list.addClass('active');
            list.removeClass('watched');
            activeVideo = list;

            
        });
    });
    console.log(videos);

}());