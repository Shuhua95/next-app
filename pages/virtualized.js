import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { AutoSizer, Collection } from 'react-virtualized'
import 'react-virtualized/styles.css' // only needs to be imported once
import { Card } from 'antd'
const { Meta } = Card

export default class extends React.Component {
  static async getInitialProps() {
    const res = await fetch(`http://gank.io/api/data/all/20/1`)
    const data = await res.json()

    return { data: data.results.filter(({ type }) => type != '休息视频') }
  }

  constructor(props) {
    super(props)

    this.state = {
      list: props.data,
      columnCount: this.getColumnCount(props.data.length),
      height: 300,
      horizontalOverscanSize: 0
    }

    this.columnYMap = []

    this.cellRenderer = ({ index, key, style }) => {
      const {createdAt: time, desc, images = [], type, url, who} = this.state.list[index]
      const src = images[0] ? images[0]
        : /\.(jpg|gif|jpeg)+$/.test(url) ? url
        : ''

      return <Card
        title={`${who} - ${moment(time).format('YYYY-MM-DD')}`}
        hoverable
        cover={src && <img alt={type} src={src} />}
        bordered={false}
        key={key}
        style={style}
      >
        <Meta
          title={type}
          description={desc}
        />
      </Card>
    }

    this.cellSizeAndPositionGetter = ({ index }) => {
      const {list, columnCount} = this.state
      
      const columnPosition = index % (columnCount || 1)

      // Poor man's Masonry layout; columns won't all line up equally with the bottom.
      const height = 300;
      const width = 300;
      const x = columnPosition * (10 + width);
      const y = this.columnYMap[columnPosition] || 0;

      this.columnYMap[columnPosition] = y + height + 10

      return {
        height,
        width,
        x,
        y
      }
    }

    this.noContentRenderer = () => {
      return <div className={styles.noCells}>No cells</div>;
    }

  }

  render() {
    const { list } = this.state

    return <AutoSizer>
      {({ height, width }) => 
        <Collection
          cellCount={list.length}
          cellRenderer={this.cellRenderer}
          cellSizeAndPositionGetter={this.cellSizeAndPositionGetter}
          noContentRenderer={this.noContentRenderer}
          height={height}
          width={width}
        />
      }
    </AutoSizer>
  }

  getColumnCount(cellCount) {
    return Math.round(Math.sqrt(cellCount));
  }
}