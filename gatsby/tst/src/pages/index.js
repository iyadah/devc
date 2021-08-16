import React from "react"
import {Link} from "gatsby"
import Navbar from "../components/Navbar"

export default function Home() {
  return <div>
        <Navbar />
    Hello world!

    <div>
    <Link to="/about">about</Link>
    </div>
    <div>
    <Link to="/company/history">history</Link>
    </div>
  </div>
}
