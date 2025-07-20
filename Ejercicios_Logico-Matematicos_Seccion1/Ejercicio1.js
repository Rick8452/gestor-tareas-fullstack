//implementar una funcion que reciba una cadena de texto, la divida por espacios y devuelva cada palabra invertida, respetando el orden de las palabras.

function invertirPalabras (texto){
    return texto.split(" ").map(palabra => palabra.split("").reverse().join("")).join(" ")
}

console.log(invertirPalabras("Hola soy una cadena"))
console.log (invertirPalabras("Programando ando"))
console.log(invertirPalabras("Concatenacion"))

// Notas:
// Utilice .split() para separar cada palabra en letras
// Utilice .reverse() para invertir cada palabra 
// Utilice .join() para volver a unir las letras