import React from 'react'
import { useAuth } from '../../context/AuthContext'
import NavButton from './NavButton'

export default function DefaultNavigation() {
    const { userRoleAuthority } = useAuth()
    return (
        <>
            {

                <>
                    <NavButton to='/dashboard'>Dashboard</NavButton>
                    {
                        <>
                            {userRoleAuthority <= 3 && <NavButton to='/team-management'>Team Management</NavButton>}

                            {userRoleAuthority <= 1 && <NavButton to='/users-management'>Users Management</NavButton>}

                            {userRoleAuthority <= 4 && (
                                <>
                                    <NavButton to='/work-items-management'>Work Items Management</NavButton>

                                    <NavButton to='/team-statistics'>Team Statistics</NavButton>
                                </>
                            )}
                        </>
                    }
                </>
            }
        </>
    )
}
