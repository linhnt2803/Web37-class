import React, { Component } from 'react'
import Clock from './components/parts/Clock'

class App extends Component {
  renderItem(item, key) {
    return <span key={key}>{item}</span>
  }

  render() {
    // example render list

    // let arrayString = ['a', 'b', 'c']
    // let arrayCpns = [
    //   <div key="1">Div</div>,
    //   <span key="2">span</span>,
    //   <p key="3">P</p>
    // ]
    return (
      <div className="app">
        <Clock type="figure"/>
        {/* {arrayString}
        {arrayCpns}
        {arrayString.map(this.renderItem)} */}
      </div>
    )
  }
}

export default App