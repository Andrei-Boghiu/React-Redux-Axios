import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import { AuthProvider, useAuth } from './context/AuthContext'

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/login'
						element={
							<GuestRoute>
								<Login />
							</GuestRoute>
						}
					/>
					<Route
						path='/register'
						element={
							<GuestRoute>
								<Register />
							</GuestRoute>
						}
					/>
					<Route
						path='/dashboard'
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	)
}

// Private Route Component
function PrivateRoute({ children }) {
	const { isAuthenticated } = useAuth()
	const location = useLocation()

	return isAuthenticated ? children : <Navigate to='/login' state={{ from: location }} replace />
}

// Guest Route Component
function GuestRoute({ children }) {
	const { isAuthenticated } = useAuth()
	const location = useLocation()

	return isAuthenticated ? <Navigate to={location.state?.from || '/dashboard'} replace /> : children
}

export default App
