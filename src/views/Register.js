import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleRegister = async (event) => {
		event.preventDefault()
		try {
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, {
				email,
				password,
			})
			console.log('Registration successful:', response.data)
			alert('Registration successful!')
			navigate('/login')
		} catch (error) {
			console.error('Registration failed:', error.response ? error.response.data : 'Server error')
			alert('Failed to register, please check your inputs and try again.')
		}
	}

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleRegister}>
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
				<button type='submit'>Register</button>
			</form>
		</div>
	)
}

export default Register
