export const specialTeams = [
    {
        teamId: 1959, // Dev Team
        navigation: [
            { btnId: 1, navigateTo: '/dashboard', btnName: 'Dashboard' },
            { btnId: 2, navigateTo: '/teams-management', btnName: 'Teams Management' },
            { btnId: 3, navigateTo: '/users-management', btnName: 'Users Management' },
            { btnId: 4, navigateTo: '/teams-statistics', btnName: 'Teams Statistics' }
        ]
    },
    {
        teamId: 1930, // Admins Team
        navigation: [
            { btnId: 1, navigateTo: '/teams-management', btnName: 'Teams Management' },
            { btnId: 2, navigateTo: '/users-management', btnName: 'Users Management' },
            { btnId: 3, navigateTo: '/teams-statistics', btnName: 'Teams Statistics' }
        ]
    },
    {
        teamId: 1914, // Team Admins Team
        navigation: [
            { btnId: 1, navigateTo: '/my-teams', btnName: 'My Teams' },
            { btnId: 2, navigateTo: '/create-new-team', btnName: 'Create New Team' },
        ]
    },
];