import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login } = useAuth()
	const navigate = useNavigate()

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
				email,
				password,
			})

			const {
				token,
				user: { id, role },
			} = response.data
			if (token && role && id) {
				login(token, role, email, id)
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
		<div>
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
