const fs = require('fs')
const PDFDocument = require('pdfkit')
const Jimp = require('jimp')

// Create the PDF document
const doc = new PDFDocument({
  layout: 'landscape',
  size: 'A4',
})

// The name and score
const name = 'يحيى صلاح كساب' // Arabic name
const score = 92

// Pipe the PDF to a file
const outputStream = fs.createWriteStream(`${name}.pdf`)
doc.pipe(outputStream)

// Draw the first certificate image on top (if needed)
doc.image('certificateFiqh.png', 0, 0, { width: 900, height: 600 })

// Load an Arabic font (Amiri-Regular in this case)
doc.font('fonts/Amiri-Regular.ttf')

// Function to reverse the order of words in Arabic text
function reverseArabicText(text) {
  // Split the text into words
  const words = text.trim().split(/\s+/)

  // Reverse the order of words
  const reversedText = words.reverse().join(' ')

  return reversedText
}

// Reverse the name (if needed)
const reversedName = reverseArabicText(name)

// Draw the name with reversed order
doc.fontSize(60).text(reversedName, 15, 200, {
  align: 'center',
})

// Draw the score
doc.fontSize(60).text(`${score}%`, 20, 330, {
  align: 'center',
})

// Finalize the PDF and end the stream
doc.end()

// // Path to your input PNG file
// const inputFilePath = 'certificateFiqh.png'

// // Path to save the modified PNG file
// const outputFilePath = `${name}.png`

// // Path to your custom TTF font file (replace with your font file path)
// const customFontPath = 'fonts/Amiri-Regular.ttf' // Example path
// // Register the custom font
// registerFont(customFontPath, { family: 'Amiri' })

// // Load the input PNG file using canvas
// loadImage(inputFilePath)
//   .then((image) => {
//     const canvas = createCanvas(image.width, image.height)
//     const ctx = canvas.getContext('2d')

//     // Draw the input image onto the canvas
//     ctx.drawImage(image, 0, 0, image.width, image.height)

//     // Set font properties
//     ctx.font = '40px Amiri' // Font size and family

//     // Text color and alignment
//     ctx.fillStyle = '#FFFFFF' // White color
//     ctx.textAlign = 'center'
//     ctx.textBaseline = 'middle'

//     // Calculate text position
//     const x = canvas.width / 2
//     const y = canvas.height / 2

//     // Draw Arabic text on the canvas
//     ctx.fillText(name, x, y)

//     // Save canvas to a PNG file
//     const outputStream = fs.createWriteStream(outputFilePath)
//     const pngStream = canvas.createPNGStream()
//     pngStream.pipe(outputStream)
//     pngStream.on('end', () => {
//       console.log(`Arabic text "${name}" added to ${outputFilePath}`)
//     })
//   })
//   .catch((err) => {
//     console.error(err)
//   })

outputStream.on('finish', () => {
  console.log(`PDF created: ${name}.pdf`)
})
