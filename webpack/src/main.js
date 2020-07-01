import $ from 'jquery'
import { deflateSync } from 'zlib'
import './main.css'

// window.onload = () => {}
$(window).on('load', () => {
  console.log('using jquery success!')
})

let str = 'asdfxghjkasdfxghjkasdfxghjkasdfxghjkasdfxghjkasdfxghjkasdfxghjk'
let strZipped = deflateSync(str).toString('base64')
console.log('after zipped: ', str.length, strZipped.length)

console.log('hello')