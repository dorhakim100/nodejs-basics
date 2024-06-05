import ms from 'ms'

const six = ms(6000, { long: true })
const twelve = ms(12000, { long: true })
const twentyThree = ms(-23000, { long: true })

console.log('six:', six)
console.log('twelve:', twelve)
console.log('twentyThree:', twentyThree)
