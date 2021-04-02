import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import HorizontalMenu from '../HorizontalMenu'

const Layout = (props) => {
    return (
        <div id="wrapper">
            <Header />
            <HorizontalMenu />
            <div className="clearfix"></div>
            {props.children}
            {/* <Footer /> */}
        </div>
    )
}

export default Layout