import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import styled, { createGlobalStyle } from 'styled-components'
import Header from '../components/Header'

const GlobalStyle = createGlobalStyle`
  /* fix jumping scrollbar */
  html {
    overflow-y: scroll;
  }
  :root {
    overflow-y: auto;
    overflow-x: hidden;
  }
  :root body {
    position: absolute;
  }
  body {
    width: 100vw;
    overflow: hidden;
  }

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
    height: auto;
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

  #__next {
    display: flex;
    flex-flow:column;
    min-height:100vh;
  }
`

const Main = styled.main`
  flex: 1;
`

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return <React.Fragment>
      <Header />
      <GlobalStyle />
      <Main>{children}</Main>
      <footer style={{ textAlign: 'center' }}>
        &copy;2018 Created by fangniu[AT]live.com base on
        <a href="https://reactjs.org/" target="_blank">
          React
        </a>
        &amp;
        <a href="https://nextjs.org/" target="_blank">
          next.js
        </a>
        &amp;
        <a href="https://ant.design/" target="_blank">
          antd
        </a>
      </footer>
    </React.Fragment>
  }
}

export default class NextApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <title>{`${pageProps.title || 'Default Title'} | Next.js`}</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    )
  }
}
