import * as React from "react"
import Layout from "../components/layout"

import Seo from "../components/seo"

// markup
const NotFoundPage = ({ location }) => {
  return (
    <Layout>
      <Seo
        pagetitle="ページが見つかりません。"
        pagepath={location.pathname}
      />
      <h1>お探しのページが見つかりませんでした</h1>
    </Layout>
  )
}

export default NotFoundPage
