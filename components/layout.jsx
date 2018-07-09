import Head from 'next/head'
import AppHeader from './Header'
import { Layout } from 'antd'
const { Header, Content, Footer } = Layout
import { injectGlobal } from 'styled-components'
injectGlobal`
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
    height: auto;
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

  .ant-layout {
    min-height: 100vh
  }
  .ant-layout-content {
    flex: 1;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
  }
`

export default ({ children, title = 'ban12.com' }) => (
  <Layout>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
      <title>{ `${title} | Next.js` }</title>
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
      <link rel='stylesheet' href='/_next/static/style.css' />
    </Head>
    <Header style={{ background: '#fff' }}>
      <AppHeader />
    </Header>
    <Content>
      { children }
    </Content>
    <Footer style={{textAlign: 'center'}}>
      ban12.com &copy;2018 Created by fangniu[AT]live.com base on <a href="https://reactjs.org/" target="_blank">React</a> &amp; <a href="https://nextjs.org/" target="_blank">next.js</a> &amp; <a href="https://ant.design/" target="_blank">antd</a>
    </Footer>
  </Layout>
)