import fs from 'fs'

function demoSync() {
  const content = fs.readFileSync('data/data.txt', 'utf8')
  console.log('content:', content)
}

sumFromFile('data/data.txt')
  .then((sum) => {
    console.log(sum)
  })
  .catch(() => console.log('There was an error'))

function sumFromFile(data) {
  let sum = 0
  return new Promise((resolve, reject) => {
    fs.readFile(data, 'utf8', (err, contents) => {
      if (err) {
        console.log('Cannot read file')

        return reject()
      }
      contents.split()
      //   console.log(contents)
      for (let i = 0; i < contents.length; i++) {
        sum += +contents[i]
      }
      //   console.log(sum)
      return resolve(sum)
    })
  })
}
