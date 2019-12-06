import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import styled from 'styled-components'

NProgress.configure({
  showSpinner: false
});

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const links = [
  { title: 'Home', href: '/' },
  { title: 'React learning', href: '/react' },
  { title: 'Hooks', href: '/react-hooks' },
  { title: 'virtualized', href: '/virtualized' },
  { title: 'About', href: '/about' }
]

const Navigation = styled.nav`
  display: flex;
  justify-content: center;

  a + a {
    margin-left: 10px;
  }
`

export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 'Home'
    }
  }

  render() {
    return <header>
      <Head>
        <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
      </Head>
      <Navigation>
        {
          links.map((item, index) =>
            <Link key={index} href={item.href}>
              <a>{item.title}</a>
            </Link>
          )
        }
      </Navigation>
    </header>
  }
}