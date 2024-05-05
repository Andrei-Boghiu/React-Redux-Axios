import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setAuthenticated] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			setAuthenticated(true)
		}
	}, [])

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
