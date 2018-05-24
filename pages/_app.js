import React from 'react'
import App, {Container} from 'next/app'
import Head from 'next/head'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
import Header from '../components/Header'

export default class NextApp extends App {
  state = {
    current: 'mail'
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    const {Component, pageProps} = this.props
    
    return <Container>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
        <link rel='stylesheet' href='/_next/static/style.css' />
      </Head>
      <style jsx global>{`
        html {
          box-sizing: border-box;
          -webkit-overflow-scrolling: touch;
        }
        *,
        ::after,
        ::before {
          box-sizing: inherit;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei",
            Roboto, "Helvetica Neue";
        }
        iframe,
        img,
        object,
        video {
          max-width: 100%;
        }
        button {
          cursor: pointer;
          outline: none;
          background-color: transparent;
          border: none;
        }
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        a {
          text-decoration: none;
          color: inherit;
          transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }
        img {
          border: none;
        }
        .container {
          margin: 0 auto;
          max-width: 1200px;
        }
      `}</style>
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Icon type="mail" />Navigation One
          </Menu.Item>
        <Menu.Item key="app" disabled>
          <Icon type="appstore" />Navigation Two
          </Menu.Item>
        <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
        </Menu.Item>
      </Menu>
      <Header />
      <Component {...pageProps} />
    </Container>
  }
}
