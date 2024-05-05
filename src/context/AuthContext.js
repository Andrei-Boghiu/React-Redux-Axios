import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setAuthenticated] = useState(false)
	const [userRole, setUserRole] = useState('')
	const [userEmail, setUserEmail] = useState('')
	const [userId, setUserId] = useState(null)

	const login = (token, role, email, id) => {
		localStorage.setItem('token', token)
		localStorage.setItem('role', role)
		localStorage.setItem('email', email)
		localStorage.setItem('id', id)

		setAuthenticated(true)
		setUserRole(role)
		setUserEmail(email)
		setUserId(id)
	}

	const logout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('role')
		localStorage.removeItem('email')
		localStorage.removeItem('id')

		setAuthenticated(false)
		setUserRole('')
		setUserEmail('')
		setUserId(null)
	}

	const verifyToken = async (token) => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/verify-token`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			const { email, id, role } = response.data.user

			localStorage.setItem('role', role)
			localStorage.setItem('email', email)
			localStorage.setItem('id', id)

			setAuthenticated(true)
			setUserRole(role)
			setUserEmail(email)
			setUserId(id)
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

	return <AuthContext.Provider value={{ isAuthenticated, userRole, userEmail, userId, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
