import React, { Component } from 'react'
import CTitle from '../components/pieces/Title'
import CSpacer from '../components/pieces/Spacer'
import CTableGroup from '../components/parts/TableGroup'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <CTitle>Products</CTitle>
        <CSpacer></CSpacer>
        <CTableGroup></CTableGroup>
      </div>
    )
  }
}

export default Home
