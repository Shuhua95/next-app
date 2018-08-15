import React from 'react'
import styled from 'styled-components'
import { Card, Icon, Avatar } from 'antd'

const { Meta } = Card
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

const VideoCards = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  .ant-card {
    flex: 0 1 360px;
    position: relative;
    margin: 1%;
  }
  
  .ant-card-body {
    padding-bottom: 57px;
  }

  .ant-card-meta {
    margin-bottom: 10px
  }

  .ant-card-actions {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

const VideoCard = ({ data }) => (
  <Card
    cover={<img alt={data.slogan} src={data.cover.homepage} />}
    actions={[<IconText type="heart-o" text={data.consumption.collectionCount} />, <IconText type="like-o" text={data.consumption.shareCount} />, <IconText type="message" text={data.consumption.replyCount} />]}
  >
    <Meta
      avatar={<Avatar src={data.author.icon} />}
      title={data.author.name}
      description={data.author.description}
    />
    {data.description}
  </Card>
)

export default ({listData}) =>(
  <VideoCards>
    {
      listData.itemList.filter(({ type }) => type === 'video')
        .map(({ data }) => <VideoCard key={data.id} data={data} />)
    }
  </VideoCards>
)