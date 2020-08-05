import React, { Component } from 'react'

class SearchForm extends Component {
  constructor(props = { value, onChange }) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    if(this.props.onChange instanceof Function) {
      let value = e.target.value
      this.props.onChange(value)
    }
  }

  render() {
    let { value, placeholder } = this.props
    return (
      <form className="search-form"
        // onSubmit={onSubmit}
        >
        <input
          value={value}
          onChange={this.onChange}
          placeholder={placeholder}/>
      </form>
    )
  }
}

export default SearchForm
