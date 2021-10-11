window.clock = (function() {
    'use strict';

    function getCurrentTime(){
        const d = new Date();
        return d.toLocaleTimeString();
    }

    function clockElem(){
        let clock = $('<p>00:00:00</p>');
        clock.css('border', '1px solid black');
        clock.css('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif");
        clock.css('padding', '7px 10px');
        clock.css('width', 'fit-content');
        clock.css('background', 'antiquewhite');
        clock.css('border-radius', '5px');
        clock.css('margin', '5px');
        return clock;
    }

    function getClock(){
        const clock = clockElem();
        setInterval(() => clock.text(getCurrentTime()), 1000);
        return clock;
    }

    function getStopwatch(){
        let time = [0, 0, 0];
        let stopwatch = clockElem();
        setInterval(() => {
            stopwatch.text(getTimeInString(time));
            time = incrementTime(time);
        }, 1000);
        return stopwatch;
    }

    function getTimeInString([h, m, s]){
        return`${padTime(h)}:${padTime(m)}:${padTime(s)}`
    }

    function padTime(n){
        return n.toString().padStart(2, '0');
    }

    function incrementTime(time){
        if(!time || time.length < 3 || isNaN(time[0] || isNaN(time[1]) || isNaN(time[2]))){
            return [0, 0, 0];
        }

        let h = time[0];
        let m = time[1];
        let s = time[2];

        if(s < 59){
            return [h, m, ++s];
        } else if(m < 59) {
            return [h, ++m, 0];
        } 
        
        return [++h, 0, 0];

    }

    return {
        getClock: getClock,
        getStopwatch: getStopwatch
    }
})();