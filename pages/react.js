import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { Card, Col, Row, Button } from 'antd'
import { notDeepStrictEqual } from 'assert';
const { Meta } = Card

export default class Index extends React.Component {
  static async getInitialProps() {
    const res = await fetch(`http://gank.io/api/data/all/20/1`)
    const data = await res.json()

    return { data }
  }

  render() {
    const { results } = this.props.data
    const list = results.filter(({ type }) => type != '休息视频')
    return <section className="container">
      <Row gutter={16}>
        {
          list.map(({ createdAt: time, desc, images = [], type, url, who, _id }) => {
            const src = images[0] ? images[0]
              : /\.(jpg|gif|jpeg)+$/.test(url) ? url
              : '';
            return <Col span={8} key={_id}>
              <Card
                title={`${who} - ${moment(time).format('YYYY-MM-DD')}`}
                hoverable
                cover={src && <img alt={type} src={src} />}
                bordered={false}
              >
                <Meta
                  title={type}
                  description={desc}
                />
              </Card>
            </Col>
          })
        }
      </Row>
      <style jsx>{`
        .container {
          margin-top: 50px;
          background: #ECECEC;
          padding: 30px
        }
      `}</style>
    </section>
  }
}