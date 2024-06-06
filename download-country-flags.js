import fs from 'fs'
import { utilService } from './services/util.service.js'

downloadCountryFlags()
function downloadCountryFlags() {
  const countries = getCountries().then((data) => {
    console.log(
      'Countries:',
      data.map((c) => c.name)
    )
    downloadFlags(data).then(() => {
      console.log('Your flags are ready')
    })
  })
}
function getCountries() {
  var countries = []
  return new Promise((resolve, reject) => {
    const countries = readJsonFile('data/countries.json')
    if (!countries) return reject()
    const sortedCountries = countries.sort((a, b) => {
      if (a.population < b.population) return 1
      if (a.population > b.population) return -1
      return 0
    })
    sortedCountries.length = 5
    // console.log('sortedCountries:', sortedCountries)
    resolve(sortedCountries)
  })
}
function downloadFlags(countries) {
  // TODO: use the download() function to download a flag
  // the name of the file should be the country name
  // TODO: use the Array.map function to generate a promise for each download
  // TODO: use Promise.all()
  countries.map((country) => {
    return new Promise((resolve, reject) => {
      if (!country) return reject()
      utilService.download(country.flags.png, `${country.name.common}.png`)
      resolve()
    })
  })
  Promise.all(countries)
    .then(() => console.log('Download complete'))
    .catch(console.log('error'))
}

function readJsonFile(path) {
  const str = fs.readFileSync(path, 'utf8')
  const json = JSON.parse(str)
  return json
}
