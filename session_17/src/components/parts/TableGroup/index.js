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
      list: [], // Table

      pageIndex: 1,
      pageSize: 10, // TableControls
      search: '', // SearchForm
      filter: {
        categoryId: null // Dropdown
      }
    }
  }

  componentDidMount() {
    this.callApi()
  }

  callApi() {
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
      console.log('response', res)
      let list = res.data
      this.setState({ list })
    })
  }

  render() {
    return (
      <div className="c-table-group">
        <div>
          <SearchForm />
          <CDropdown />
        </div>
        <div>
          <CTable />
        </div>
        <div>
          <TableControls />
        </div>
      </div>
    )
  }
}

export default TableGroup
