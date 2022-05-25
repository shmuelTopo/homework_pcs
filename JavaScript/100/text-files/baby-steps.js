const numbers = process.argv.slice(2);

const sum = numbers.reduce((previous, current) => {
    return Number(previous) + Number(current);
})

console.log(sum);