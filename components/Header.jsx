import React from 'react'
import Link from 'next/link'

export default class Header extends React.Component {
  render() {
    const links = [
      { title: 'Home', href: '/' },
      { title: 'About', href: '/about' }      
    ]

    return <nav className="nav-links">
      <style jsx>{`
        .nav-links {
          background-color: red;
        }
        .nav-links a + a {
          margin-left: 20px;
        }
      `}</style>
      {
        links.map((item, index) =>
          <Link key={index} href={item.href}>
            <a>{ item.title }</a>
          </Link>
        )
      }
    </nav>
  }
}