import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { List } from 'antd'

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
    return <section className="container">
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
      <style jsx>{`
        .container {
          margin-top: 50px;
        }
      `}</style>
    </section>
  }
}