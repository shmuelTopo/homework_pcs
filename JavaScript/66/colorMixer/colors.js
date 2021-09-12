window.colors = (function (myModule) {
    'use strict';

    myModule.getRandomColor = () => {
        let r = Math.ceil(Math.random() * 255);
        let g = Math.ceil(Math.random() * 255);
        let b = Math.ceil(Math.random() * 255);

        return {
            cssFormat: `rgb(${r},${g},${b})`,
            colorArray: [r, g, b],
            r: r,
            g: g,
            b: b
        };
    };

    myModule.get = (id) => {
        return document.getElementById(id);
    };

    myModule.shouldRun = true;
    myModule.colors = [];
    myModule.colorsTable = myModule.get('colorsTable');
    myModule.html = document.querySelector('html');

    myModule.addColor = (color) => {
        if (!myModule.colors.length) {
            // If there is no contacts yet, delete the first row
            myModule.colorsTable.deleteRow(1);
        }

        myModule.colors.push(color);

        const tabelBody = myModule.colorsTable.getElementsByTagName('tbody')[0];
        const row = tabelBody.insertRow();

        const timeCol = row.insertCell();
        const colorCol = row.insertCell();


        row.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b}, 0.7)`;

        const now = new Date();
        timeCol.innerHTML = `<div class="scroll">${now.toLocaleString()}<div>`;
        colorCol.innerHTML = `<div class="scroll">${color.cssFormat}<div>`;

        row.addEventListener('click', () => {
            myModule.html.style.backgroundColor = color.cssFormat;
            myModule.shouldRun = false;
        });
    };

    myModule.runWebsite = () => {

        let theInter = setInterval(() => {
            let randomColor = window.colors.getRandomColor();
            window.colors.html.style.backgroundColor = randomColor.cssFormat;
            window.colors.addColor(randomColor);
            if (myModule.shouldRun === false) {
                clearInterval(theInter);
            }
        }, 1000);
    };
    
    return myModule;

})(window.colors || {});


window.addEventListener('load', () => {
    'use strict';

    window.colors.runWebsite();
});
