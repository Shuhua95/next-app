import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default class Index extends React.Component {
  /* static async getInitialProps() {
    const res = await fetch(`http://gank.io/api/data/all/20/2`)
    const data = await res.json()

    return {
      shows: data
    }
  } */

  render() {
    return <section className="container">
      <h1>Hello React</h1>
      <style jsx>{`
        .container {
          margin-top: 50px;
        }
      `}</style>
    </section>
  }
}