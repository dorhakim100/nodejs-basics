import fs from 'fs'
import { utilService } from './services/util.service.js'

import { pdfService } from './services/pdf-service.js'

import { load } from 'cheerio'

readFromFile('data/animal-data.csv')
  .then((animals) => {
    // console.log(animals)

    const promises = animals.map((animal) => {
      return suggestImgs(animal.name).then((data) => {
        animal.imgUrl = data
        // console.log(animal)
        return animal
      })
    })

    return Promise.all(promises)
  })
  .then((animalsWithImgUrls) => {
    // console.log('animalsWithImgUrls:', animalsWithImgUrls)
    const downloadDir = './downloads'

    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir)
    }

    const promises = animalsWithImgUrls.map((animal) => {
      return utilService
        .download(animal.imgUrl, `${downloadDir}/${animal.name}.png`)
        .then(() => {
          return animal
        })
    })
    return Promise.all(promises)
  })
  .then((animals) => {
    console.log('Download complete')
    // console.log('animals:', animals)
    pdfService.buildAnimalsPDF(animals)
    console.log('PDF ready')
  })

function readFromFile(data) {
  const animals = []
  return new Promise((resolve, reject) => {
    fs.readFile(data, 'utf8', (err, contents) => {
      if (err) {
        console.log('Cannot read file')

        return reject()
      }

      contents = contents.split(`\n`)

      for (let i = 0; i < contents.length - 1; i++) {
        const animal = contents[i + 1].split(',')
        if (animal[2].includes('\r')) {
          animal[2] = animal[2].slice(0, animal[2].length - 1)
        }
        animals[i] = {
          id: animal[0],
          name: animal[1],
          count: animal[2],
        }
      }
      // console.log(animals)
      return resolve(animals)
    })
  })
}

function suggestImgs(term) {
  const url = `https://www.istockphoto.com/search/2/image?phrase=${term}`
  return utilService.httpGet(url).then((res) => {
    const $ = load(res)
    const topImg = Array.from($('[class*="yGh0CfFS4AMLWjEE9W7v"]'))[0]
    const imgUrl = topImg.attribs.src
    return imgUrl
  })
}
