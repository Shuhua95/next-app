import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { List } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin-top: 50px;
`

export default class Index extends React.Component {
  static async getInitialProps() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show data fetched. Count: ${data.length}`)

    return {
      shows: data
    }
  }

  render() {
    return <Wrapper>
      <List
        bordered
        dataSource={this.props.shows}
        renderItem={item => (
          <List.Item>
            <Link as={`/p/${item.show.id}`} href={`/post?id=${item.show.id}`}>
              <a>{item.show.name}</a>
            </Link>
          </List.Item>
        )}
      >
      </List>
    </Wrapper>
  }
}