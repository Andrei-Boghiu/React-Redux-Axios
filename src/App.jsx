import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './views/Login'
import RequestTeamAccess from './views/RequestTeamAccess'
import CreateTeam from './views/CreateTeam'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import UserManagement from './views/UserManagement'
import WorkItemsManagement from './views/WorkItemsManagement'
import StatisticsDashboard from './views/StatisticsDashboard'
import NotFound from './views/NotFound'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './Layout'
import './App.css'
import './assets/buttons.css'
import './assets/helpers.css'
import Register from './views/Register'

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Layout>
					<Routes>
						<Route path='/'
							element={
								<Home />
							}
						/>
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
							path='/request-team-access'
							element={
								<PrivateRoute>
									<RequestTeamAccess />
								</PrivateRoute>
							}
						/>
						<Route
							path='/create-team'
							element={
								<PrivateRoute>
									<CreateTeam />
								</PrivateRoute>
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
						<Route path='*'
							element={
								<NotFound />
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
