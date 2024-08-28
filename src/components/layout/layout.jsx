import React from 'react'
import NavBar from '../nav-component/nav-component'

function layout({children}) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>

  )
}

export default layout