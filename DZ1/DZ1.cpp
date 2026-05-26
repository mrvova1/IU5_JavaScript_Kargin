//1

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8'); 
const mas = JSON.parse(input);

let dia = 0;
for (let i = 0; i < mas.length; i++) {
    if (i < mas[i].length) {
        dia += mas[i][i];
    }
}

let altdia = 0;
for (let i = mas.length-1; i > -1; i--) {
    if ((i < mas[i].length) & (i > -1)) {
        altdia += mas[i][i];
    }
}

console.log(dia);
console.log(altdia);




//2
function isEqualObj(a, b){
    if (a === b){
        return true;
    }
    else return false;
}
//3
function isEqualArrays(a, b){
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++){
        if (!isEqualObj(a[i], b[i])) return false;
    }
    return true
}

console.log(isEqualObj(1, "1.0"))
console.log(isEqualObj(1, 1.0))

console.log(isEqualArrays([1, "1.0"], [1, 1.0]))
console.log(isEqualArrays([1, 1.0], [1.0, 1]))
console.log(isEqualArrays([1, 1.0], [1, 1.0]))