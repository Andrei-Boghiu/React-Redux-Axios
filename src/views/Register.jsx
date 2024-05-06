import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { requestRegister } from '../api/authService'

function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleRegister = async (event) => {
		event.preventDefault()
		try {
			const response = await requestRegister({ email, password })

			console.log('Registration successful:', response.data)
			alert('Registration successful!')
			navigate('/login')
		} catch (error) {
			console.error('Registration failed:', error.response ? error.response.data : 'Server error')
			alert('Failed to register, please check your inputs and try again.')
		}
	}

	return (
		<div className='form-container'>
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
