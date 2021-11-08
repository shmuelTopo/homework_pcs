(function() {
    'use strict';


    // window.addEventListener("DOMContentLoaded", (event) => {
    //     const audio = document.querySelector("audio");
    //     audio.volume = 0.4;
    //     audio.play();
    // });

    const bodyPartsNames = [
        {name: 'hat1', size: 230, z: 3}, {name: 'handL', size: 110, z: 1},
        {name: 'handR', size: 110, z: 1}, {name: 'earL', size: 80, z: 1}, {name: 'earR', size: 80, z: 1},
        {name: 'eyes1', size: 120, z: 3}, {name: 'eyes2', size: 120, z: 3}, {name: 'eyes3', size: 120, z: 3},
        {name: 'redEyes', size: 130, z: 3}, {name: 'glasses1', size: 100, z: 3},{name: 'nose1', size: 85, z: 3}, 
        {name: 'humanNose', size: 100, z: 3}, {name: 'mouse1', size: 100, z: 3}, {name: 'bird1', size: 150, z: 4}, {name: 'mouse2', size: 100, z: 3}, {name: 'redLips', size: 120, z: 4},
        {name: 'shoe1', size: 150, z: 1}, {name: 'shoe2', size: 150, z: 3}
    ];


    
    $('#reset').click(() => {
        saveBodyParts = [];
        localStorage.removeItem("savedBodyPartsMemorie");
        resetBodyParts();
    });

    let boxToDrag = null;
    let offset;


    let saveBodyParts = JSON.parse(localStorage.getItem('savedBodyPartsMemorie')) || [];

    function resetBodyParts(){
        $('#bodyParts').empty();
        
        bodyPartsNames.forEach(element => {
            const url = `media/${element.name}.png`;
            const image = $(`<img id=${element.name} class="draggable" src="${url}">`);
            const bodyPartImage = $(`<div></div>`);
            bodyPartImage.append(image);
    
            $(image).attr('size', element.size);
            image.css({
                width: '50px',
                'z-index': element.z
            });
            $('#bodyParts').append(bodyPartImage);
            
        });
    }

    resetBodyParts();

    if(saveBodyParts){
    
        saveBodyParts.forEach(e => {
            $(`#${e.id}`).css({top: e.location.top, left: e.location.left, width: `${$(`#${e.id}`).attr('size')}`});

        });
        
    }


    $(document).on('mousedown', '.draggable', e => { 
        boxToDrag = e.target;
        $(boxToDrag).css('width', `${$(boxToDrag).attr('size')}`);
        offset = {x: e.offsetX, y: e.offsetY};
    });

    $(document).mousemove(e => {
        if(boxToDrag) {
            e.preventDefault();
            $(boxToDrag).css({top: e.pageY - offset.y, left: e.pageX - offset.x});
        }
    }).mouseup(() => {
        console.log(boxToDrag.id);
        const part = $(boxToDrag);
        saveBodyParts.push({
            id: boxToDrag.id,
            location: {top: part.css('top'), left: part.css('left')}
        });

        localStorage.setItem('savedBodyPartsMemorie', JSON.stringify(saveBodyParts));
        console.log(saveBodyParts);
        boxToDrag = null;
    });

})();
