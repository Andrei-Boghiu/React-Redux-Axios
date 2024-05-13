import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './views/Login'
import RequestTeamAccess from './views/RequestTeamAccess'
import CreateNewTeam from './views/CreateNewTeam'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import MyTeams from './views/MyTeams'
import UserManagement from './views/UsersManagement'
import TeamManagement from './views/TeamManagement'
import TeamsManagement from './views/TeamsManagement'
import WorkItemsManagement from './views/WorkItemsManagement'
import TeamStatistics from './views/TeamStatistics'
import TeamsStatistics from './views/TeamsStatistics'
import NotFound from './views/NotFound'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './Layout'
import './App.css'
import './assets/buttons.css'
import './assets/helpers.css'
import Register from './views/Register'

function RoleRouteModel({ children, authorityLevel }) {
	const { isAuthenticated, userRoleAuthority, teams } = useAuth()
	const location = useLocation()
	const joinedAnyTeam = teams?.length > 0;
	const approvedInATeam = joinedAnyTeam ? teams.some(team => team.approved) : false;
	const isAuthorized = approvedInATeam ? userRoleAuthority <= authorityLevel : false;

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

export default function App() {
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
							path='/request-team-access'
							element={
								<PrivateRoute>
									<RequestTeamAccess />
								</PrivateRoute>
							}
						/>
						<Route
							path='/create-new-team'
							element={
								<TeamAdminRoute>
									<CreateNewTeam />
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
							path='/my-teams'
							element={
								<TeamAdminRoute>
									<MyTeams />
								</TeamAdminRoute>
							}
						/>
						<Route
							path='/team-statistics'
							element={
								<AllocatorRoute>
									<TeamStatistics />
								</AllocatorRoute>
							}
						/>
						<Route
							path='/teams-statistics'
							element={
								<AdminRoute>
									<TeamsStatistics />
								</AdminRoute>
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
							path='/teams-management'
							element={
								<AdminRoute>
									<TeamsManagement />
								</AdminRoute>
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
						<Route path='*' element={<NotFound />} />
					</Routes>
				</Layout>
			</Router>
		</AuthProvider>
	)
};