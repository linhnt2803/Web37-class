import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainNav from './components/parts/MainNav'
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <MainNav />
          <Routes />
        </div>
      </BrowserRouter>
    )
  }
}

export default App