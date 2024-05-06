import React, { createContext, useContext, useState, useEffect } from 'react'
import { requestVerifyToken } from '../api/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setAuthenticated] = useState(false)
	const [isAdmin, setAdmin] = useState(false)

	const [userRole, setUserRole] = useState('')
	const [userEmail, setUserEmail] = useState('')
	const [userId, setUserId] = useState(null)

	const login = (token, role, email, id) => {
		localStorage.setItem('token', token)

		setAuthenticated(true)
		setUserRole(role)
		setUserEmail(email)
		setUserId(id)
		setAdmin(role === 'admin' || role === 'manager')
	}

	const logout = () => {
		localStorage.removeItem('token')

		setAuthenticated(false)
		setUserRole('')
		setUserEmail('')
		setUserId(null)
		setAdmin(false)
	}

	const verifyToken = async (token) => {
		try {
			const response = await requestVerifyToken()

			const { email, id, role } = response.data.user

			login(token, role, email, id)
		} catch (error) {
			console.error('Token validation failed:', error)
			logout()
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')

		if (token) {
			verifyToken(token)
		}
	})

	return (
		<AuthContext.Provider value={{ isAuthenticated, userRole, userEmail, userId, login, logout, isAdmin }}>{children}</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
