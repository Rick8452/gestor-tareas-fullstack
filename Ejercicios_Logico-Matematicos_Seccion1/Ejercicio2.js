//Implementar una funcion que reciba un arreglo de numeros y retorne un nuevo arreglo conteniendo unicamente los numeros pares unico(sin repetidos).

function numerosParesUnicos(array) {
    const unicos= [...new Set(array)]
    return unicos.filter(num => num % 2 === 0)

}

console.log(numerosParesUnicos([2,7,9,12,33,15,22,12,4]))
console.log(numerosParesUnicos([1,2,3,4,5,6,7,2,4,6,8,6]))

// Notas:
// Utilice Set para evitar los duplicados 
// Utilice el operador de propagacion "..."para que se creara el nuevo arreglo
// Utilice .filter() para recorrer el array y obtener los numeros pares 