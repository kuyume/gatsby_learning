import React from "react"

import Header from "../components/header"
import Footer from "../components/footer"

import "./layout.css"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Layout = ({ currentPage, children }) => {
  return (
    <div>
      <Header
        currentPage={currentPage}
      />

      {children}

      <Footer />
    </div>
  )
}

export default Layout