import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setAuthenticated] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			verifyToken(token)
		}
	}, [])

	const verifyToken = async (token) => {
		try {
			await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/verify-token`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setAuthenticated(true)
		} catch (error) {
			console.error('Token validation failed:', error)
			localStorage.removeItem('token')
			setAuthenticated(false)
		}
	}

	const login = (token) => {
		localStorage.setItem('token', token)
		setAuthenticated(true)
	}

	const logout = () => {
		localStorage.removeItem('token')
		setAuthenticated(false)
	}

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
