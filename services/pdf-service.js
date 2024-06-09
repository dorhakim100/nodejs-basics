import PDFDocument from 'pdfkit'

import fs from 'fs'

export const pdfService = {
  buildAnimalsPDF,
}

function buildAnimalsPDF(animals, fileName = 'SaveTheAnimals.pdf') {
  const doc = new PDFDocument()
  const pdfsDir = './pdfs'

  if (!fs.existsSync(pdfsDir)) {
    fs.mkdirSync(pdfsDir)
  }
  doc.pipe(fs.createWriteStream(`${pdfsDir}/${fileName}`))
  let counter = animals.length
  animals.map((animal) => {
    doc.image(`downloads/${animal.name}.png`, {
      fit: [250, 300],
      align: 'center',
      valign: 'center',
    })
    doc
      .font('fonts/calibri-regular.ttf')
      .fontSize(25)
      .text(`${animal.name} - Count: ${animal.count}`, 100, 600)
    counter--
    if (counter !== 0) {
      doc.addPage()
    }
  })

  doc.end()
}
