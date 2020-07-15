function to2Digit(number) {
  return number < 10
    ? `0${number}`
    : number
}

function randomColor() {
  let red = this.randomInt(256)
  let green = this.randomInt(256)
  let blue = this.randomInt(256)
  
  return `rgb(${red}, ${green}, ${blue})`
}

function randomInt(max) {
  return parseInt(Math.random() * max)
}

// let img = await loadImage('url image')
function loadImage(url) {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.onload = () => resolve(image)
    image.onerror = (err) => reject(err)

    image.src = url
  })
}

export {
  to2Digit,
  randomColor,
  randomInt,
  loadImage
}