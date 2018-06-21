import React from 'react'

const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

export default class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filterText: '',
      inStockOnly: false
    }
  }

  handleFilterTextChange = value => {
    this.setState({
      filterText: value
    })
  }

  handleInStockChange = value => {
    this.setState({
      inStockOnly: value
    })
  }

  render() {
    const { filterText, inStockOnly } = this.state
    return (
      <div className="filterable-product-table">
        <SearchBar
          filterText={filterText}
          inStockOnly={inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange} />
        <ProductTable
          products={PRODUCTS}
          filterText={filterText}
          inStockOnly={inStockOnly} />
        <style jsx>{`
          .filterable-product-table {
            max-width: 500px;
          }
        `}</style>
      </div>
    )
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
  }

  handleFilterTextChange = e => {
    this.props.onFilterTextChange(e.target.value)
  }

  handleInStockChange = e => {
    this.props.onInStockChange(e.target.checked)
  }

  render() {
    return (
      <div className="search-bar">
        <input id="filterText" type="text" value={this.props.filterText} onChange={this.handleFilterTextChange}/><br />
        <input id="inStockOnly" type="checkbox" checked={this.props.inStockOnly} onChange={this.handleInStockChange}/>
        <label htmlFor="inStockOnly">Only show product in stock</label>
      </div>
    )
  }
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {products, filterText, inStockOnly} = this.props

    const rows = []
    let lastCategory = null

    products.forEach(({category, price, stocked, name}) => {
      if (name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return
      if (inStockOnly && !stocked) return

      if (category !== lastCategory) {
        rows.push(<ProductCategoryRow key={category} category={category} />)
        lastCategory = category
      }
      rows.push(<ProductRow key={name} stocked={stocked} name={name} price={price} />)
    })

    return (
      <div className="product-table">
        <h2><span>name</span>price</h2>
        {rows}
        <style jsx>{`
          h2 {
            display: flex
          }
          h2 span {
            flex: 1 0 auto;
          }
        `}</style>
      </div>
    )
  }
}

function ProductCategoryRow(props) {
  return (
    <h3>
      {props.category}
      <style jsx>{`
        h3 {
          text-align: center
        }
      `}</style>
    </h3>
  )
}

function ProductRow(props) {
  return (
    <p>
      <span style={props.stocked ? null : {color: 'red'}}>{props.name}</span>
      {props.price}
      <style jsx>{`
        p {
          display: flex
        }
        p span {
          flex: 1 0 auto;
        }
      `}</style>
    </p>
  )
}