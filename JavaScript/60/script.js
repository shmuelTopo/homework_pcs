"use strict" // jshint ignore:line
/*jshint -W132, -W098*/
var user_name = "Shmuel Toporowitch";
var email = "shmuel@example.bs";
var age = prompt("What is your age?");
/*jshint +W132*/
alert("You are " + age + " and you were born on " + ((2021 - age) - 1) + "/" + (2021 - age));