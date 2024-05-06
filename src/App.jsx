import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import UserManagement from './views/UserManagement'
import WorkItemsManagement from './views/WorkItemsManagement'
import StatisticsDashboard from './views/StatisticsDashboard'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './Layout'
import './App.css'

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Layout>
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
						<Route
							path='/statistics-dashboard'
							element={
								<AdminRoute>
									<StatisticsDashboard />
								</AdminRoute>
							}
						/>
						<Route
							path='/user-management'
							element={
								<AdminRoute>
									<UserManagement />
								</AdminRoute>
							}
						/>
						<Route
							path='/work-items-management'
							element={
								<AdminRoute>
									<WorkItemsManagement />
								</AdminRoute>
							}
						/>
					</Routes>
				</Layout>
			</Router>
		</AuthProvider>
	)
}

function AdminRoute({ children }) {
	const { isAuthenticated, userRole } = useAuth()
	const location = useLocation()
	const isAdmin = userRole === 'admin' || userRole === 'manager'

	return isAuthenticated ? (
		isAdmin ? (
			children
		) : (
			<Navigate to={location.state?.from || '/dashboard'} replace />
		)
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	)
}

function PrivateRoute({ children }) {
	const { isAuthenticated } = useAuth()
	const location = useLocation()

	return isAuthenticated ? children : <Navigate to='/login' state={{ from: location }} replace />
}

function GuestRoute({ children }) {
	const { isAuthenticated } = useAuth()
	const location = useLocation()

	return isAuthenticated ? <Navigate to={location.state?.from || '/dashboard'} replace /> : children
}

export default App
