import React, { Component } from 'react'
import CDropdown from '../../pieces/Dropdown'
import CTable from '../../pieces/Table'
import SearchForm from './SearchForm'
import TableControls from './TableControls'

class TableGroup extends Component {
  constructor(props) {
    super(props)
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
