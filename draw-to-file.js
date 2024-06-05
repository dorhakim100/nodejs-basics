import fs from 'fs'
// import { utilService } from './services/util.service.js'

// drawSquareToFile()

function drawToFile(str) {
  return new Promise((resolve, reject) => {
    fs.writeFile('data/pic.txt', str, 'utf8', (err, contents) => {
      if (err) {
        console.log('Cannot read file')

        return reject()
      }
      console.log(str)
      return resolve()
    })
  })
}

function drawSquareToFile() {
  const str = getSquare(getRandomIntInclusive(3, 20))
  drawToFile(str).then(() => {
    setTimeout(drawSquareToFile, 200)
  })
}

function getSquare(size) {
  var str = '*'.repeat(size) + '\n'
  for (let i = 0; i < size; i++) {
    str += '*' + ' '.repeat(size - 2) + '*\n'
  }
  str += '*'.repeat(size) + '\n'
  return str
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}
