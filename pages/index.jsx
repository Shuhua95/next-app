import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { List } from 'antd'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

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
      <ul>
        <PostLink id="hello-nextjs" title="Hello Next.js" />
        <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
        <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
      </ul>
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
    </section>
  }
}