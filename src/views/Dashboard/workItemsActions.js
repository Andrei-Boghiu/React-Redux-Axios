
export const workItemsActions = [
    {
        id: 1,
        name: 'Resolved Successfully',
        status: 'Resolved',
        resolution: 'Successful',
        annotation: {
            allowed: true,
            mandatory: false,
        },
        followUpDate: {
            allowed: false,
            mandatory: false
        }
    },
    {
        id: 2,
        name: 'Resolved Out of Scope',
        status: 'Resolved',
        resolution: 'Out of Scope',
        annotation: {
            allowed: true,
            mandatory: false,
        },
        followUpDate: {
            allowed: false,
            mandatory: false
        }
    },
    {
        id: 3,
        name: 'Pending - Sideline',
        status: 'Pending',
        resolution: 'Sideline',
        annotation: {
            allowed: true,
            mandatory: true,
        },
        followUpDate: {
            allowed: false,
            mandatory: false
        }
    },
    {
        id: 4,
        name: 'Pending - Follow Up',
        status: 'Pending',
        resolution: 'Follow Up',
        annotation: {
            allowed: true,
            mandatory: false,
        },
        followUpDate: {
            allowed: true,
            mandatory: true
        }
    },
    {
        id: 5,
        name: 'Release Item',
        status: 'Unassigned',
        resolution: '',
        annotation: {
            allowed: true,
            mandatory: true,
        },
        followUpDate: {
            allowed: false,
            mandatory: false
        }
    },
]