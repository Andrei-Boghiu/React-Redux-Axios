import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { loginRequest } from '../../api/authService'
import './Login.css'

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
		if (event instanceof KeyboardEvent) {
			setCapsLockOn(event.getModifierState('CapsLock'))
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyChange)
		window.addEventListener('keyup', handleKeyChange)

		// Cleanup the event listeners on component unmount
		return () => {
			window.removeEventListener('keydown', handleKeyChange)
			window.removeEventListener('keyup', handleKeyChange)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		setLoading(true)

		try {
			const response = await loginRequest({ email, password })

			const { token, id, username, email: resEmail, firstName, teams } = response

			if (token && id && username && resEmail && firstName) {
				login({ token, id, username, email: resEmail, firstName, teams })
				navigate('/')
			} else {
				console.error('Login failed: Incomplete data received')
				alert('Failed to log in, please try again.')
			}
		} catch (error) {
			console.log(error)
			const errMessage = error?.response?.data?.message
			alert(`Error: ${errMessage || 'Unexpected error while tying to login. Please check the console'}`)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='form-container'>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						autoComplete='email'
					/>
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						autoComplete='current-password'
					/>
				</div>
				{capsLockOn && <p className='small red italic'>Caps Lock is on.</p>}
				<button
					type='submit'
					disabled={isLoading}
					className={isLoading ? 'disabled' : ''}
				>
					{isLoading ? 'Loading...' : 'Submit'}
				</button>
				<div className='flex-row-evenly'>
					<Link
						className='btn-link-small'
						onClick={handleForgotPassword}
					>
						Forgot your password?
					</Link>
					<Link
						className='btn-link-small'
						to='/register'
					>
						Don't have an account?
					</Link>
				</div>
			</form>
		</div>
	)
}
