import PropTypes from 'prop-types';
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

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout
