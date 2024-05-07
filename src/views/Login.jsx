import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginRequest } from '../api/authService'

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login } = useAuth()
	const navigate = useNavigate()

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const response = await loginRequest({ email, password })

			const {
				token,
				user: { id, role, isAdmin, firstName },
			} = response.data

			if (token && role && id) {
				login(token, role, email, id, isAdmin, firstName)
				navigate('/dashboard')
			} else {
				console.error('Login failed: Incomplete data received')
				alert('Failed to log in, please try again.')
			}
		} catch (error) {
			console.error('Login failed:', error.response ? error.response.data : 'Server error')
			alert('Failed to log in, please check your credentials and try again.')
		}
	}

	return (
		<div className='form-container'>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email:</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Enter your email'
						required
						autoComplete='true'
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Enter your password'
						required
						autoComplete='true'
					/>
				</div>
				<button type='submit'>Log In</button>
			</form>
		</div>
	)
}

export default Login
