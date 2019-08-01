import React from 'react'
import Link from 'next/link'
import 'isomorphic-unfetch'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import styled from 'styled-components'
import VideoCard from '../components/VideoCard'

const Wrapper = styled.section`
  margin: auto;
  max-width: 1200px;
`

export default class Index extends React.Component {
  /* static async getInitialProps() {
    const res = await fetch(`${process.env.BACKEND_URL}/eyepetizer/tabs/selected`)
    const data = await res.json()

    return {
      title: 'Home',
      listData: data
    }
  } */

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const { listData } = this.props

    return <Wrapper>
      {/* <VideoCard listData={listData} /> */}
      <h1>hello next.js</h1>
    </Wrapper>
  }
}