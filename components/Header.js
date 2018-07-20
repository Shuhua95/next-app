import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Menu } from 'antd'

NProgress.configure({
  showSpinner: false
});

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const links = [
  { title: 'Home', href: '/' },
  { title: 'React learning', href: '/react' },
  { title: 'virtualized', href: '/virtualized' },
  { title: 'About', href: '/about' }
]

export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 'Home'
    }
  }

  render() {
    return <>
      <Head>
        <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />        
      </Head>
      <Menu
        mode="horizontal"
        style={{lineHeight: '64px'}}>
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
    </>
  }
}