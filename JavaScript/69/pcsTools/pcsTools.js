window.pcs = function (id) {
  'use strict';

  //Our internal functions
  function get(id) {
    return document.getElementById(id);
  }

  function setCss(elem, prop, value) {
    elem.style[prop] = value;
  }

  function getCss(elem, prop) {
    return getComputedStyle(elem)[prop];
  }

  function randomNum(n){
    //Get random number from 0 to n, not exclusive
    return Math.floor(Math.random()*n);
  }

  function randomColor(){
    return `rgb(${randomNum(256)}, ${randomNum(256)}, ${randomNum(256)})`
  }

  const theElem = get(id);
  const values = {};

  function getValue(obj, key){
     if(key in obj){
       return obj[key];
     }
  }

  function setValue(obj, key, value){
    obj[key] = value;
  }

  return {

    css: function (prop, value) {
      if (arguments.length === 1) {
        return getCss(theElem, prop);
      }
      setCss(theElem, prop, value);
      return this;
    },
    click: function (callback) {
      theElem.addEventListener('click', callback);
      return this;
    },
    hide: function () {
      setCss(theElem, 'display', 'none');
      return this;
    },
    show: function () {
      setCss(theElem, 'display', 'block');
      return this;
    },
    flash: function(duration=2000, speed=100, transition=50) {
      const oldColor = this.css('color');
      if(transition){
        this.css('transition', `color ${transition}ms`);
      }
      let handler = setInterval(() => this.css('color', randomColor()), speed);
      setTimeout(() => {
        clearInterval(handler);
        this.css('color', oldColor);
        this.css('transation', 'initial')
      }, duration)
      return this;
    }, 
    value: function(key, value){
      if (arguments.length === 1) {
        return getValue(values, key);
      }
      setValue(values, key, value);
      return this;
    }
  };
  
};