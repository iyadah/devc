import React from "react"
import {Link} from "gatsby"
import Layout from "../components/Layout"
import {ExBut}  from "../components/button"
export default function Home() {
  return <Layout>
    Hello world!

    <div>
    <Link to="/about">about</Link>
    </div>
    <div>
    <Link to="/company/history">history</Link>
    </div>

    <ExBut>Click here</ExBut>
  </Layout>
}
