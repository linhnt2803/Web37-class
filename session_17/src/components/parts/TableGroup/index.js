import React, { Component } from 'react'
import axios from 'axios'

import CDropdown from '../../pieces/Dropdown'
import CTable from '../../pieces/Table'
import SearchForm from './SearchForm'
import TableControls from './TableControls'

class TableGroup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tableHeader: ['Title', 'Description', 'Categories'],
      list: [], // Table
      count: 0, // TableControls

      pageIndex: 1,
      pageSize: 2, // TableControls
      search: '', // SearchForm
      filter: {
        categoryId: null // Dropdown
      }
    }

    // bind this for handlers
    this.callApiCount = this.callApiCount.bind(this)
    this.callApiList = this.callApiList.bind(this)
    this.setPageConfig = this.setPageConfig.bind(this)
  }

  componentDidMount() {
    this.callApiCount()
    this.callApiList()
  }

  setPageConfig(config = { pageIndex, pageSize, search, filter }) {
    this.setState(config)
  }

  callApiCount() {
    let { search, filter } = this.state
    let queryParams = {
      count: true,
      search,
      categoryId: filter.categoryId || ''
    }

    axios.request({
      url: 'http://localhost:9000/api/product',
      method: 'GET',
      params: queryParams
    })
    .then(res => {
      let count = res.data.count || 0
      this.setState({ count })
    })
  }

  callApiList() {
    let { pageIndex, pageSize, search, filter } = this.state
    let queryParams = {
      pageIndex,
      pageSize,
      search,
      categoryId: filter.categoryId || ''
    }
    
    axios.request({
      url: 'http://localhost:9000/api/product',
      method: 'GET',
      params: queryParams,
    })
    .then(res => {
      let list = res.data
      this.setState({ list })
    })
    // let list = [
    //   { _id: '123123', title: 'Cai Bap 1' },
    //   { _id: '123123', title: 'Cai Bap 2' },
    //   { _id: '123123', title: 'Cai Bap 3' }
    // ]
    // this.setState({ list })
  }

  render() {
    let {
      count, pageIndex, pageSize,
      list, tableHeader
    } = this.state
    return (
      <div className="c-table-group">
        <div>
          <SearchForm />
          <CDropdown />
        </div>
        <div>
          <CTable
            list={list}
            header={tableHeader}/>
        </div>
        <div>
          <TableControls
            count={count}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageConfig={this.setPageConfig}
            callApiList={this.callApiList}/>
        </div>
      </div>
    )
  }
}

export default TableGroup
