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
      requesting: false,
      listInQueue: false,

      tableHeader: ['Title', 'Description', 'Categories'],
      list: [], // Table
      count: 0, // TableControls

      pageIndex: 1,
      pageSize: 2, // TableControls
      search: '', // SearchForm
      filter: {
        categoryId: '' // Dropdown.value
      },
      optionCategories: [
        { value: '', text: 'Select category' }
      ] // Dropdown.options
    }

    // bind this for handlers
    this.callApiCount = this.callApiCount.bind(this)
    this.callApiList = this.callApiList.bind(this)
    this.setPageConfig = this.setPageConfig.bind(this)
  }

  componentDidMount() {
    let state = this.state
    this.callApiCount(state)
    this.callApiList(state)
    this.callOptionCategories()
  }

  componentWillUpdate(newProps, newState) {
    let oldState = this.state
    let mustCallList = false
    let mustCallCount = false
    if(newState.pageIndex != oldState.pageIndex) {
      mustCallList = true
    }
    if(newState.pageSize != oldState.pageSize) {
      mustCallList = true
    }
    if(newState.search != oldState.search) {
      mustCallList = true
      mustCallCount = true
    }
    if(newState.filter.categoryId != oldState.filter.categoryId) {
      mustCallList = true
      mustCallCount = true
    }

    if(mustCallCount) {
      this.callApiCount(newState)
    }
    if(mustCallList) {
      this.callApiList(newState)
    }
  }

  setPageConfig(config = { pageIndex, pageSize, search, filter }) {
    this.setState(config)
  }

  callApiCount(state) {
    let { search, filter } = state
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

  callApiList(state) {
    if(this.state.requesting) {
      this.setState({ listInQueue: true })
      return
    }

    console.log('request')
    this.setState({ requesting: true })
    let { pageIndex, pageSize, search, filter } = state
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
    .finally(() => {
      this.setState({ requesting: false })

      if(this.state.listInQueue) {
        this.setState({ listInQueue: false })
        this.callApiList(this.state)
      }
    })
    

    // let list = [
    //   { _id: '123123', title: 'Cai Bap 1' },
    //   { _id: '123123', title: 'Cai Bap 2' },
    //   { _id: '123123', title: 'Cai Bap 3' }
    // ]
    // this.setState({ list })
  }

  callOptionCategories() {
    axios.request({
      url: 'http://localhost:9000/api/category',
      method: 'GET'
    }).then(res => {
      let categories = res.data
      let optionCategories = [
        { value: '', text: 'Select category' },
        ...categories.map(category => {
          return { value: category._id, text: category.title }
        })
      ]
      this.setState({ optionCategories })
    })
  }

  render() {
    let {
      count, pageIndex, pageSize,
      list, tableHeader,
      search,
      filter, optionCategories
    } = this.state
    return (
      <div className="c-table-group">
        <div>
          <SearchForm
            value={search}
            onChange={(value) => {
              this.setPageConfig({ search: value })
            }}
            placeholder="Enter search keywords.."
            />
          <CDropdown
            options={optionCategories}
            value={filter.categoryId}
            onChange={(value) => {
              this.setPageConfig({ filter: { categoryId: value } })
            }}
            />
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
            // callApiList={this.callApiList}
            />
        </div>
      </div>
    )
  }
}

export default TableGroup
