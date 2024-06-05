import { utilService } from './util.service.js'

// const cars = ['car1', 'car2']
const cars = utilService.readJsonFile('data/car.json')

global.babaNum = 12345

export const carService = {
    sayHi,
    getCars,
    getAns
}

function sayHi() {
    console.log('Hi and welcome!')
}

function getCars() {
    return cars
}


function getAns() {
    return utilService.httpGet('https://yesno.wtf/api')
}