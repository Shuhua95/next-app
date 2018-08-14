import React from 'react'
import Link from 'next/link'
import 'isomorphic-unfetch'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { List, Avatar, Icon, Drawer } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin: auto;
  max-width: 1200px;
`
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class Index extends React.Component {
  static async getInitialProps() {
    const res = await fetch('https://niiker.com/api/eyepetizer/tabs/selected')
    const data = await res.json()

    return {
      title: 'Home',
      listData: data
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      play: null
    }
  }

  showDrawer = (item) => {
    this.setState({
      play: item,
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      play: null,
      visible: false,
    })
  }

  render() {
    const { listData } = this.props
    const { visible, play } = this.state

    return <Wrapper>
      <List
        itemLayout="vertical"
        size="large"
        bordered
        dataSource={listData.itemList.filter(({ type }) => type === 'video')}
        renderItem={({ data: item }) => (
          <List.Item
            key={item.id}
            actions={[<IconText type="heart-o" text={item.consumption.collectionCount} />, <IconText type="like-o" text={item.consumption.shareCount} />, <IconText type="message" text={item.consumption.replyCount} />]}
            extra={<img width={272} alt={item.slogan} src={item.cover.homepage} />}
            onClick={this.showDrawer.bind(this, item)}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.author.icon} />}
              title={<a href={item.author.link}>{item.author.name}</a>}
              description={item.author.description}
            />
            {item.description}
          </List.Item>
        )}
      >
      </List>

      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={this.onClose}
        visible={visible}
        width="50%"
      >
        {
          play && <video src={play.playUrl} controls></video>
        }
      </Drawer>
    </Wrapper>
  }
}