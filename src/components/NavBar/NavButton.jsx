import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom'
import '../../assets/buttons.css'

const NavButton = ({ to, children }) => {
	const location = useLocation()
	const isActive = location.pathname === to ? 'btn-highlight' : ''
	const outline = to === '/register' || to === '/login' ? 'btn-outline' : ''

	return (
		<Link className={`nav-button ${isActive} ${outline}`} to={to}>
			{children}
		</Link>
	)
}

NavButton.propTypes = {
	children: PropTypes.node.isRequired,
	to: PropTypes.string.isRequired
};

export default NavButton
