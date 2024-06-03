import { testFuncAPI } from "./handlers";

export const actionButtons = [
    {
        id: 1,
        label: 'Resolve',
        description: 'Set the status of the item as resolved successfully. It can be reintegrated in the allocation flow if it is tagged with the reopened status',
        handleSubmit: testFuncAPI,
    },
    // {
    //     id: 2,
    //     label: 'Transfer',
    //     description: 'Set the status of the item as resolved successfully. It can be reintegrated in the allocation flow if it is tagged with the reopened status',
    //     handleSubmit: testFuncAPI,
    //     active: false,
    //     searchArea: true,
    // },
    {
        id: 3,
        label: 'Release',
        description: 'Set the status of the item as resolved successfully. It can be reintegrated in the allocation flow if it is tagged with the reopened status',
        handleSubmit: testFuncAPI,
        textarea: true,
    },
    {
        id: 4,
        label: 'Not In Scope',
        description: 'Set the status of the item as resolved successfully. It can be reintegrated in the allocation flow if it is tagged with the reopened status',
        handleSubmit: testFuncAPI,
        textarea: true,
    },
    {
        id: 5,
        label: 'Temporary Sideline',
        description: 'Set the status of the item as resolved successfully. It can be reintegrated in the allocation flow if it is tagged with the reopened status',
        handleSubmit: testFuncAPI,
        datetime: true,
        textarea: true,
    },
    {
        id: 6,
        label: 'Undetermined Sideline',
        description: 'Set the status of the item as resolved successfully. It can be reintegrated in the allocation flow if it is tagged with the reopened status',
        handleSubmit: testFuncAPI,
        textarea: true,
    },
];

export const caseActions = [
    { id: 1, title: "Resolve Item", description: "Set the item in resolved status", additionalInfoRequired: false, btnText: "Resolve", apiCallFunc: testFuncAPI },
    { id: 2, title: "Transfer Item", description: "Transfer the item to another user", additionalInfoRequired: true, btnText: "Transfer", apiCallFunc: testFuncAPI },
    { id: 3, title: "Release Item", description: "Release the item from your lobby", additionalInfoRequired: false, btnText: "Not In Scope", apiCallFunc: testFuncAPI },
    { id: 4, title: "Item Not In Scope", description: "Resolve the item as not in scope", additionalInfoRequired: false, btnText: "Sideline", apiCallFunc: testFuncAPI },
    { id: 5, title: "Temporary Sideline", description: "Sideline the item by adding a follow up date, after the follow up passes the item will be reintegrated in allocation.", additionalInfoRequired: false, btnText: "", apiCallFunc: testFuncAPI },
    { id: 6, title: "Undetermined Sideline ", description: "Sideline the item for an undetermined time period, the item will be available in your lobby.", additionalInfoRequired: false, btnText: "", apiCallFunc: testFuncAPI }
];