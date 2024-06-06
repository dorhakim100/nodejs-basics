import fs from 'fs'
import { utilService } from './services/util.service.js'

import { load } from 'cheerio'

readFromFile('data/animal-data.csv')

function readFromFile(data) {
  const animals = []
  return new Promise((resolve, reject) => {
    fs.readFile(data, 'utf8', (err, contents) => {
      if (err) {
        console.log('Cannot read file')

        return reject()
      }
      console.log('contents:', contents)
      contents.split(',')

      console.log('contents:', contents)
      return resolve()
    })
    //   .pipe(loadCSV())
    //   .on('animal-data', (contents) => animals.push(data))
    //   .on('end', () => {
    //     console.log('animals: ', animals)
    //   })
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
