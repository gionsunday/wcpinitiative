function arrayAverage(Narray){
 const average = Narray.reduce((a,b) => a + b, 0)/Narray.length
 console.log(average, Narray.length)

const sorted = Narray.sort((a,b)=> b-a)
console.log(sorted)

const filtered = Narray.filter((a) => a > 1)
 console.log(filtered)
}

arrayAverage([1,3,2])

function objTaker(){
    
}