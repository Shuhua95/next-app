import React from 'react'
import Link from 'next/link'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

export default class Header extends React.Component {
  state = {
    current: 'Home'
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    const links = [
      { title: 'Home', href: '/' },
      { title: 'About', href: '/about' }
    ]

    return <Menu
      onClick={this.handleClick}
      selectedKeys={[this.state.current]}
      mode="horizontal"
      style={{lineHeight: '64px'}}
    >
      {links.map((item, index) =>
        <Menu.Item key={item.title}>
          <Link key={index} href={item.href}>
            <a>{item.title}</a>
          </Link>
        </Menu.Item>
      )
      }
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
    </Menu>
  }
}