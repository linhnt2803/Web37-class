import React, { Component } from 'react'
import CButton from '../../pieces/Button'

class TableControls extends Component {
  constructor(props = {
    count, pageIndex, pageSize, setPageConfig
  }) {
    super(props)

    this.toPage = this.toPage.bind(this)
  }

  genPageIndexNumbers(pageIndex, maxPage) {
    // pageIndex = 1, maxPage = 5
    // > result [1, 2, 3]
    let result = [pageIndex]
    for(let i = 1; i < 3; i++) {
      let pageIndexNumber = pageIndex + i
      if(pageIndexNumber > maxPage) {
        break
      } else {
        result.push(pageIndexNumber)
      }
    }
    return result
  }

  toPage(newPageIndex, maxPage) {
    let currentPageIndex = this.props.pageIndex
    if(newPageIndex != currentPageIndex
      && newPageIndex > 0
      && newPageIndex <= maxPage) {
      
      this.props.setPageConfig({ pageIndex: newPageIndex })
      // this.props.callApiList()
      // setTimeout(this.props.callApiList, 10)
    }
  }

  render() {
    let { count, pageIndex, pageSize } = this.props
    let maxPage = Math.ceil(count / pageSize)
    let pageIndexNumbers = this.genPageIndexNumbers(pageIndex, maxPage)
    return (
      <div className="table-controls">
        <CButton
          onClick={() => this.toPage(pageIndex - 1, maxPage)}
        >&lt;&lt;</CButton>
        {pageIndexNumbers.map(number => {
          let isCurrentPageIndex = number == pageIndex
          let clickHandler = () => this.toPage(number, maxPage)
          return isCurrentPageIndex
            ? (
              <CButton
                key={number}
                onClick={clickHandler}
                style={{ textDecoration: 'underline' }}
                >{number}</CButton>
            )
            : (
              <CButton
                onClick={clickHandler}
                key={number}>{number}</CButton>
            )
        })}
        <CButton
          onClick={() => this.toPage(pageIndex + 1, maxPage)}
        >&gt;&gt;</CButton>
      </div>
    )
  }
}

export default TableControls
