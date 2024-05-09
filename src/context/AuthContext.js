import React, { createContext, useContext, useState, useEffect } from 'react'
import { requestVerifyToken } from '../api/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setAuthenticated] = useState(false)
	const [admin, setAdmin] = useState(false)

	const [userRole, setUserRole] = useState('')
	const [userEmail, setUserEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [userId, setUserId] = useState(null)

	const login = (token, role, email, id, isAdmin, firstName) => {
		localStorage.setItem('token', token)

		setAuthenticated(true)
		setUserRole(role)
		setUserEmail(email)
		setUserId(id)
		setAdmin(isAdmin)
		setFirstName(firstName)
	}

	const logout = () => {
		localStorage.removeItem('token')

		setAuthenticated(false)
		setUserRole('')
		setUserEmail('')
		setFirstName(false)
		setUserId(null)
		setAdmin(false)
	}

	const verifyToken = async (token) => {
		try {
			const response = await requestVerifyToken()

			const { email, id, role, isAdmin, firstName } = response.data.user

			// console.log({ email, id, role, isAdmin, firstName })

			login(token, role, email, id, isAdmin, firstName)
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
		<AuthContext.Provider value={{ isAuthenticated, userRole, userEmail, userId, login, logout, admin, firstName }}>{children}</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
