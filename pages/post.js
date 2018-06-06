import React from 'react'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'
import { Card } from 'antd'
const { Meta } = Card

export default class Post extends React.Component {
  static async getInitialProps({ query }) {
    const res = await fetch(`https://api.tvmaze.com/shows/${query.id}`)
    const show = await res.json()

    console.log(`Fetched show: ${show.name}`)

    return { show }
  }

  render() {
    const { show } = this.props

    return <section>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={show.name} src={show.image.medium} />}
      >
        <Meta
          title={show.name}
          description={show.summary.replace(/<[/]?p>/g, '')}
        />
      </Card>
      <Markdown className="markdown" source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
      `} />
      <style jsx global>{`
        .markdown {
          font-family: 'Arial';
        }
   
        .markdown a {
          text-decoration: none;
          color: blue;
        }
   
        .markdown a:hover {
          opacity: 0.6;
        }
   
        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </section>
  }
}