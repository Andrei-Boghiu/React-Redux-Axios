import React from 'react'
import { NavBar } from './components/NavBar/NavBar'
import { Footer } from './components/Footer/Footer'

const Layout = ({ children }) => {

	return (
		<>
			<NavBar />
			<div className='main-content'>{children}</div>
			<Footer />
		</>
	)
}

export default Layout
