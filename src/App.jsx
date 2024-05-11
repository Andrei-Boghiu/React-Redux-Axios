import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './views/Login'
import RequestTeamAccess from './views/RequestTeamAccess'
import CreateTeam from './views/CreateTeam'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import UserManagement from './views/UsersManagement'
import TeamManagement from './views/TeamManagement'
import WorkItemsManagement from './views/WorkItemsManagement'
import StatisticsDashboard from './views/StatisticsDashboard'
import NotFound from './views/NotFound'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './Layout'
import './App.css'
import './assets/buttons.css'
import './assets/helpers.css'
import Register from './views/Register'

function RoleRouteModel({ children, authorityLevel }) {
	const { isAuthenticated, userRoleAuthority } = useAuth()
	const location = useLocation()
	const isAuthorized = userRoleAuthority <= authorityLevel

	return isAuthenticated ? (
		isAuthorized ? (
			children
		) : (
			<Navigate to={location.state?.from || '/'} replace />
		)
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	)
}

function TeamMemberRoute({ children }) {
	return RoleRouteModel({ children, authorityLevel: 5 })
}

function AllocatorRoute({ children }) {
	return RoleRouteModel({ children, authorityLevel: 4 })
}

function TeamAdminRoute({ children }) {
	return RoleRouteModel({ children, authorityLevel: 3 })
}

// function ManagerRoute({ children }) {
// 	return RoleRouteModel({ children, authorityLevel: 2 })
// }

function AdminRoute({ children }) {
	return RoleRouteModel({ children, authorityLevel: 1 })
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
								<TeamAdminRoute>
									<CreateTeam />
								</TeamAdminRoute>
							}
						/>
						<Route
							path='/dashboard'
							element={
								<TeamMemberRoute>
									<Dashboard />
								</TeamMemberRoute>
							}
						/>
						<Route
							path='/statistics-dashboard'
							element={
								<AllocatorRoute>
									<StatisticsDashboard />
								</AllocatorRoute>
							}
						/>
						<Route
							path='/team-management'
							element={
								<TeamAdminRoute>
									<TeamManagement />
								</TeamAdminRoute>
							}
						/>
						<Route
							path='/users-management'
							element={
								<AdminRoute>
									<UserManagement />
								</AdminRoute>
							}
						/>
						<Route
							path='/work-items-management'
							element={
								<AllocatorRoute>
									<WorkItemsManagement />
								</AllocatorRoute>
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

export default App
