import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerRequest } from '../../api/authService'
import './Register.css'

export default function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordValid, setPasswordValid] = useState(null)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [isLoading, setLoading] = useState(false)

	const navigate = useNavigate()

	const validatePassword = (password) => {
		setPassword(password)
		const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{6,}$/
		setPasswordValid(regEx.test(password))
	}

	const handleRegister = async (event) => {
		event.preventDefault()
		if (!passwordValid) {
			alert("Your password doesn't meet the requirements")
			return
		}

		setLoading(true)

		try {
			const response = await registerRequest({ email, firstName, lastName, password })
			const resMessage = response?.message

			if (resMessage) {
				alert(resMessage)
			} else {
				alert('Registration successful!')
			}

			navigate('/login')
		} catch (error) {
			const errMessage = error?.response?.data?.error?.detail
			console.error('Registration failed:', error.response ? error.response.data : 'Server error')

			alert(`Error: ${errMessage || 'Failed to register, please check your inputs and try again.'}`)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='form-container'>
			<h2>Register</h2>
			<form onSubmit={handleRegister}>
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
					<label htmlFor='firstName'>First Name:</label>
					<input
						type='text'
						id='firstName'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						autoComplete='given-name'
					/>
				</div>
				<div>
					<label htmlFor='lastName'>Last Name:</label>
					<input
						type='text'
						id='lastName'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						autoComplete='family-name'
					/>
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => validatePassword(e.target.value)}
						required
						autoComplete='new-password'
						className={`${passwordValid === false ? 'issue-on-input' : ''}`}
					/>
					<div>
						<label className='small'>Password requirements:</label>
						<ul>
							<li className='small'>At least 6 characters</li>
							<li className='small'>Include an alphabetic character (A-Za-z)</li>
							<li className='small'>Include a numeric character (0-9)</li>
							<li className='small'>Include a special character (@$!%*#?&)</li>
						</ul>
					</div>
				</div>
				<button
					type='submit'
					disabled={isLoading}
					className={isLoading ? 'disabled' : ''}
				>
					{isLoading ? 'Loading...' : 'Submit'}
				</button>
				<Link
					className='btn-link-small'
					to='/login'
				>
					Already have an account?
				</Link>
			</form>
		</div>
	)
}
