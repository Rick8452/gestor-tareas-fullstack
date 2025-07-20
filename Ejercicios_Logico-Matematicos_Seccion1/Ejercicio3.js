// Implementar una funcion que reciba dos enteros inicio y fin, y devuelva una lista de pares de numeros primos gemelos dentro del rango

function primo(num){
    if (num<= 1)
        return false
    for (let i= 2; i <=Math.sqrt(num); i++){
        if (num % i === 0)
            return false 
    }
    return true
}

function primosGemelos(inicio,fin){
    const primos =[]
    for(let i = inicio; i<= fin - 2; i++){
        if (primo(i) && primo(i + 2)){
            primos.push([i,i+2])
            }
    }
    return primos
}
console.log(primosGemelos(0,10))
console.log(primosGemelos(100,150))
console.log(primosGemelos(700,800))

// Notas:
// Utilice la funcion primo() para verfiicar si es un numero primo o no y retornar un true o false
//Utilice la funcion primosGemelos() para hacer un recorrido con for de inicio a fin y asi verificar si i y i +2 son ambos primos y si lo son se almacenan como un para de primos gemelos 