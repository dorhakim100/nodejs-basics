import fs from 'fs'
import ms from 'ms'

// const six = ms(6000, { long: true })
// const twelve = ms(12000, { long: true })
// const twentyThree = ms(-23000, { long: true })

// console.log('six:', six)
// console.log('twelve:', twelve)
// console.log('twentyThree:', twentyThree)
getTime('data/time.txt')
  .then((times) => {
    console.log('times:', times)
  })
  .catch((err) => {
    console.log(err)
  })

function getTime(data) {
  const times = []
  return new Promise((resolve, reject) => {
    fs.readFile(data, 'utf8', (err, contents) => {
      if (err) {
        console.log('Cannot read file')

        return reject()
      }
      console.log('length: ', contents.length)
      const nums = contents.split(`\n`)
      console.log(nums)
      for (let i = 0; i < nums.length; i++) {
        times.push(ms(nums[i], { long: true }))
      }

      return resolve(times)
    })
  })
}
