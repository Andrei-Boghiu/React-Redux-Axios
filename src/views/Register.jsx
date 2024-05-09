import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { requestRegister } from '../api/authService'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(null)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setLoading] = useState(false)

    const navigate = useNavigate();

    const validatePassword = (password) => {
        setPassword(password)
        const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{6,}$/;
        setPasswordValid(regEx.test(password))
    }

    const handleRegister = async (event) => {
        try {
            setLoading(true)
            event.preventDefault()

            if (!passwordValid) {
                alert('Your password doesn\'t meet the requirements');
                return
            }

            const response = await requestRegister({ email, firstName, lastName, password })

            const resMessage = response?.data?.message;
            if (resMessage) {
                alert(resMessage)
            } else {
                alert('Registration successful!');
            }
            navigate('/login');
        } catch (error) {
            const errMessage = error?.response?.data?.error?.detail;
            console.log(error.response)

            if (errMessage) {
                alert(`Error: ${errMessage}`)
            } else {
                alert('Failed to register, please check your inputs and try again.');
            }
        } finally {
            setLoading(false)
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
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete='true'
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type='text'
                        name='firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        autoComplete='true'
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type='text'
                        name='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                        onChange={(e) => validatePassword(e.target.value)}
                        required
                        autoComplete='true'
                        className={`${passwordValid === false ? 'issue-on-input' : null}`}
                    />
                    <div>
                        <label className='small'>Password requirements:</label>
                        <ul>
                            <li className='small'>At least 6 characters</li>
                            <li className='small'>Include a alphabetic character (A-Za-z)</li>
                            <li className='small'>Include a numeric character (0-9)</li>
                            <li className='small'>Include a special character (@$!%*#?&)</li>
                        </ul>
                    </div>
                </div>
                <button type='submit' disabled={isLoading} className={`${isLoading && 'disabled'}`}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
                <Link className='btn-link-small' to='/login'>Already have an account?</Link>

            </form>
        </div>
    )
}

export default Register;