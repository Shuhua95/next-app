import Head from 'next/head'
import AppHeader from './Header'
import { Layout, Menu, Breadcrumb } from 'antd'
const { Header, Content, Footer } = Layout

export default ({ children, title = 'ban12.com' }) => (
  <Layout>
    <Head>
      <title>{ `${title} | Next.js` }</title>
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
    <style jsx global>{`
      .ant-layout {
        min-height: 100vh
      }
      .ant-layout-content {
        flex: 1;
        margin: 0 auto;
        max-width: 1200px;
        width: 100%;
      }
    `}</style>
  </Layout>
)