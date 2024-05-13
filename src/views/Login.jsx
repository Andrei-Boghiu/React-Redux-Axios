import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginRequest } from '../api/authService'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [capsLockOn, setCapsLockOn] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const { login } = useAuth()
	const navigate = useNavigate()

	const handleForgotPassword = () => {
		alert('Just stay calm and try to remember your password.')
	}

	const handleKeyChange = (event) => {
		console.log("checking key press...")
		if (event.getModifierState('CapsLock')) {
			setCapsLockOn(true)
		} else {
			setCapsLockOn(false)
		}
	}

	const handleLogin = async (event) => {
		try {
			setLoading(true)
			event.preventDefault()

			const response = await loginRequest({ email, password })
			console.log(response)

			const {
				token,
				user: { id, username, email: resEmail, firstName, teams },
			} = response.data

			if (token && id && username && email && firstName) {
				login({ token, id, username, email: resEmail, firstName, teams })
				navigate('/');
			} else {
				console.error('Login failed: Incomplete data received')
				alert('Failed to log in, please try again.')
			}
		} catch (error) {
			const errMessage = error?.response?.data?.message
			console.error('Login failed:', error.response ? error.response.data : 'Server error');

			if (errMessage) {
				alert(`Error: ${errMessage}`)
			} else {
				alert('Failed to log in, please check your credentials and try again.');
			}
		} finally {
			setLoading(false);
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
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						autoComplete='true'
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type='password'
						name='password'
						value={password}
						onKeyUp={handleKeyChange}
						onKeyDown={handleKeyChange}
						onChange={(e) => setPassword(e.target.value)}
						required
						autoComplete='true'
					/>
					{capsLockOn && <p className='small red italic'>Caps Lock is on.</p>}
				</div>
				<button type='submit' disabled={isLoading} className={`${isLoading && 'disabled'}`}>
					{isLoading ? 'Loading...' : 'Submit'}
				</button>
				<div className='flex-row-evenly'>
					<Link className='btn-link-small' onClick={handleForgotPassword}>Forgot your password?</Link>
					<Link className='btn-link-small' to='/register'>Don't have an account?</Link>
				</div>
			</form>
		</div>
	)
};