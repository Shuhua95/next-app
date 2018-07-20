import React from 'react'
import styled from 'styled-components'

const Filterable = styled.div`
  max-width: 500px;
`

const Row = styled.p`
  display: flex;

  span {
    flex: 1 0 auto;
  }
`

const CategoryRow = styled.h3`
  text-align: center;
`

const Title = styled.h2`
  display: flex
          
  span {
    flex: 1 0 auto;
  }
`

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
      <Filterable>
        <SearchBar
          filterText={filterText}
          inStockOnly={inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange} />
        <ProductTable
          products={PRODUCTS}
          filterText={filterText}
          inStockOnly={inStockOnly} />
      </Filterable>
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
        <Title><span>name</span>price</Title>
        {rows}
      </div>
    )
  }
}

function ProductCategoryRow(props) {
  return (
    <CategoryRow>
      {props.category}
    </CategoryRow>
  )
}

function ProductRow(props) {
  return (
    <Row>
      <span style={props.stocked ? null : {color: 'red'}}>{props.name}</span>
      {props.price}
    </Row>
  )
}