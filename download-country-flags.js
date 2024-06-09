import fs from 'fs'
import { utilService } from './services/util.service.js'

downloadCountryFlags()

function downloadCountryFlags() {
  const countries = getCountries()
  downloadFlags(countries).then(() => {
    console.log('Download done')
    const paths = fs.readdirSync('./downloads')
  })
}
function getCountries() {
  let countries = utilService.readJsonFile('data/countries.json')

  countries = countries.sort((a, b) => {
    if (a.population < b.population) return 1
    if (a.population > b.population) return -1
    return 0
  })
  countries = countries.slice(0, 5)
  return countries.map((country) => ({
    name: country.name.common,
    flag: country.flags.png,
  }))
}
function downloadFlags(countries) {
  // TODO: use the download() function to download a flag
  // the name of the file should be the country name
  // TODO: use the Array.map function to generate a promise for each download
  // TODO: use Promise.all()
  const downloadDir = './downloads'

  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir)
  }

  const promises = countries.map((country) => {
    return utilService.download(
      country.flag,
      `${downloadDir}/${country.name}.png`
    )
  })

  return Promise.all(promises)
}
