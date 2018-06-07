import React from 'react'
import App, {Container} from 'next/app'
import Layout from '../components/layout'

export default class NextApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render() {
    const {Component, pageProps} = this.props
    
    return <Container>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Container>
  }
}
