import React from 'react'
import Link from 'next/link'
import 'isomorphic-unfetch'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import styled from 'styled-components'
import VideoCard from '../components/VideoCard'
import { PageHeader, Button, Descriptions } from 'antd';

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
        <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
          <Descriptions.Item label="Association">
            <a>421421</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
          <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Remarks">
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      {/* <VideoCard listData={listData} /> */}
      <h1>hello next.js</h1>
    </Wrapper>
  }
}