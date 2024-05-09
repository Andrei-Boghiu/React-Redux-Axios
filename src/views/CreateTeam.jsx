import React from 'react'

function CreateTeam() {
    return (
        <div className='form-container'>
            <h2>Create Your Team</h2>
            <p className='red bold italic'>This feature is work in progress...</p>
            <form >
                <div>
                    <label>Team Name:</label>
                    <input
                        type='email'
                        required
                        autoComplete='true'
                        disabled={true}
                    />
                </div>
                <div>
                    <label>Team Description:</label>
                    <input
                        type='password'
                        required
                        autoComplete='true'
                        disabled={true}
                    />
                </div>
                <button disabled={true} className='disabled' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTeam;