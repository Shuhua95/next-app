import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false
});

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

import { Menu } from 'antd'

const links = [
  { title: 'Home', href: '/' },
  { title: 'React learning', href: '/react' },
  { title: 'virtualized', href: '/virtualized' },
  { title: 'About', href: '/about' }
]

export default class Header extends React.Component {
  state = {
    current: 'Home'
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return <Menu
      onClick={this.handleClick}
      selectedKeys={[this.state.current]}
      mode="horizontal"
      style={{lineHeight: '64px'}}
    >
      {
        links.map((item, index) =>
          <Menu.Item key={item.title}>
            <Link key={index} href={item.href}>
              <a>{item.title}</a>
            </Link>
          </Menu.Item>
        )
      }
    </Menu>
  }
}