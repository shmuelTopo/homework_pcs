//Stuff for counter 1
for(let i = 0; i < 10; i++){
    window.app.counter.increment();
}
// SL - I asked for this at end - to prove nobody else changes it before then...
console.log('window.app.counter.getCount()', window.app.counter.getCount());

//Stuff for counter 2
const counterNum1 = window.app.counterGenerator.getCounter();
const counterNum2 = window.app.counterGenerator.getCounter();

for (let i = 0; i < 5; i++) {
    counterNum1.increment();
}
// SL - I asked for this at end - to prove nobody else changes it before then...
console.log('counterNum1.getCount()', counterNum1.getCount());

for (let i = 0; i < 15; i++) {
    counterNum2.increment();
}
console.log('counterNum2.getCount()', counterNum2.getCount());


console.log('window.app.counterGenerator.getCountOfCounters()', window.app.counterGenerator.getCountOfCounters());





