import React, { Component } from 'react'
import './Clock.scss'

class Clock extends Component {
  constructor(props) {
    super(props)
    // props: { type: 'text' | 'figure' }
    // type == 'text': clock write text
    // type == 'figure': clock draw image
    this.state = {
      color: 'rgb(0, 0, 0)',
      hour: '00',
      minute: '00',
      second: '00',
      amOrPm: '',
      canvasSize: 300,
      canvasRef: React.createRef(),
      image: null,
      imageLink: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    }
  }

  componentDidMount() {
    setInterval(this.updateTime.bind(this), 1000)
    this.loadImage()
  }

  loadImage() {
    let image = new Image()
    image.onload = () => {
      this.setState({
        image: image
      })
    }
    image.src = this.state.imageLink
  }

  updateTime() {
    let now = new Date()
    let hour = now.getHours()
    let amOrPm = hour >= 12
      ? 'PM'
      : 'AM'
    this.setState({
      hour: this.to2Digit(hour == 12 ? hour : hour % 12),
      minute: this.to2Digit(now.getMinutes()),
      second: this.to2Digit(now.getSeconds()),
      amOrPm: amOrPm
    })

    if(this.props.type == 'figure') {
      let canvas = this.state.canvasRef.current
      this.drawClock(canvas, now.getHours()
        , now.getMinutes(), now.getSeconds())
    }
  }

  drawClock(canvas, hour, minute, seconds) {
    let { canvasSize } = this.state
    let context = canvas.getContext('2d')
    let centerX = canvasSize / 2
    let centerY = canvasSize / 2
    let radius = (canvasSize - 20) / 2

    context.beginPath()
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    context.stroke()

    let image = this.state.image
    if(image) {
      context.setTransform(1, 0.5, -0.5, 1, 30, 10)
      context.drawImage(image, 0, 0)
      context.resetTransform()
    }
  }

  to2Digit(number) {
    return number < 10
      ? `0${number}`
      : number
  }

  onClick() {
    let newColor = this.randomColor()
    this.setState({
      color: newColor
    })
  }

  randomColor() {
    let red = this.randomInt(256)
    let green = this.randomInt(256)
    let blue = this.randomInt(256)
    
    return `rgb(${red}, ${green}, ${blue})`
  }

  randomInt(max) {
    return parseInt(Math.random() * max)
  }

  render() {
    let { color, hour, minute, second, amOrPm, canvasRef, canvasSize } = this.state
    let style = {
      color: color,
      borderColor: color
    }

    return this.props.type == 'text'
      ? (
        <div
          id="clock"
          className="clock"
          onClick={this.onClick.bind(this)}
          style={style}>
          <span className="hour">{hour}</span>
          <span className="colon">:</span>
          <span className="minute">{minute}</span>
          <span className="colon">:</span>
          <span className="seconds">{second}</span>
          <span className="am-pm">{amOrPm}</span>
        </div>
      )
      : (
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
        ></canvas>
      )
  }
}

export default Clock