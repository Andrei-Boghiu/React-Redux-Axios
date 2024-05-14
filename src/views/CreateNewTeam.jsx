import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthHeaders } from '../context/useAuthHeaders';
import { getUserProfile } from '../api/userService';
import { requestCreateNewTeam } from '../api/teamsService';

export default function CreateNewTeam() {
    const navigate = useNavigate();
    const headers = useAuthHeaders();

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [teamName, setTeamName] = useState('');
    const [teamDescription, setTeamDescription] = useState('');

    const [dataReceived, setDataReceived] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCreateNewTeam = async (e) => {
        e.preventDefault()
        console.log({ email, firstName, lastName, teamName, teamDescription });
        try {
            setLoading(true)
            const response = await requestCreateNewTeam(headers, teamName, teamDescription);

            console.log(response);

            const resMessage = response?.data?.message;

            if (resMessage) {
                alert(resMessage)
            } else {
                alert('Request to create a new team sent successfully!')
            }

            navigate('/');
        } catch (error) {
            console.error(error)
            alert('There was an error...')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log(`useEffect -> create new team `);
        getUserProfile(headers)
            .then((res) => {

                // Set User Profile Data
                setEmail(res.data.email)
                setFirstName(res.data.first_name)
                setLastName(res.data.last_name)

                setDataReceived(true)
            }).catch((error) => {
                console.error(error)
                const errMessage = error?.response?.data?.message

                if (errMessage) {
                    alert(`Error: ${errMessage}`)
                } else {
                    alert('Error fetching the required data.');
                }
            });

    }, [headers])

    return (
        <div className='form-container'>
            <h2>Request Access to a Team</h2>
            <form onSubmit={handleCreateNewTeam}>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete='true'
                        disabled={email ? true : false}
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        autoComplete='true'
                        disabled={firstName ? true : false}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        autoComplete='true'
                        disabled={lastName ? true : false}
                    />
                </div>
                <div>
                    <label>Team Name:</label>
                    <input
                        type='text'
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                        disabled={!dataReceived}
                    />
                </div>
                <div>
                    <label>Team Description:</label>
                    <input
                        type='text'
                        value={teamDescription}
                        onChange={(e) => setTeamDescription(e.target.value)}
                        required
                        disabled={!dataReceived}
                    />
                </div>

                <button
                    disabled={!dataReceived || loading}
                    className={`${!dataReceived || loading ? 'disabled' : null}`}
                    type='submit'
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    )
};