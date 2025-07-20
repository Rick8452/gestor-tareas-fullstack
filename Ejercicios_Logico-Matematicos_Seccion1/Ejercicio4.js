// implementar una funcion que reciba un arreglo de enteros y un numero objetivo, y determine si existe alguna combinacion de elementos( sin repetir valores) cuya suma sea igual al numero objetivo.

function combinacionElementos(array,objetivo){
    const combinaciones = new Set([0])
    for (const num of array){
        const nuevaCombinacion = new Set()
        for (const suma of combinaciones){
            const nuevaSuma = suma+ num
            if (nuevaSuma === objetivo) 
                return true
            if (nuevaSuma < objetivo)
            nuevaCombinacion.add(nuevaSuma)
        }
        nuevaCombinacion.forEach(sumaFinal => combinaciones.add(sumaFinal))
    }
    return false
}

console.log(combinacionElementos([2,5,8,44,1,7],9))
console.log(combinacionElementos([55,3,8,11,45,1],12))
console.log(combinacionElementos([4,8,48,44,1],11))

// Notas:
// Cree la funcion combinacionElementos la cual inicializa un arreglo el cual recibe sus elementos para realizar combinaciones para y obtener el resultado objetivo 
// Con for se recorre cada numero del arreglo e intenta sumar todas la combinaciones y se almacenan en la variable suma,posteriormente se comprueba con nuevaSuma si esta nueva suma es igual al numero objetivo, si esta condicion se cumple devuelve un true, se realiza una nueva comprobacion si nuevaSuma es menor al objetivo y se continua probando, si se recorre todo el arreglo y no se encunetra ninguna combinacion se devuelve un false, finalmente el resultado se almacena en la variable sumaFinal para mostrarlo con el console.log.
