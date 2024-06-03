// this should be a special component that will be a row from the Dashboard where users can action work items 

// also add a 'resolution' column on the database, so that users can select a status and a reason for the status. 

// Example
// Status: Resolved, Resolution: Successful -- item is resolved successfully and doesn't require additional support, only if it is reopened
// Status: Resolved, Resolution: Failure -- item couldn't be processed for a strong reason

// Status: Unresolved, Resolution: Not In Scope -- item was completed and it will not be reallocated unless reopened. However, couldn't be resolved as it was out of scope 
// Status: Unresolved, Resolution: 

// Status: Pending, Resolution: Awaiting Third Party Dependency 
// Status: Pending, Resolution: Awaiting Follow up date



// Idea: - change from processing items in /dashboard to processing in special page /item/[id]
// The dashboard should be renamed like Lobby or something similar. Its purpose should be the ability to visualize work items, but not action them
// In order for a user to action a case, should open another page where the work item information will be loaded along side with methods to resolve the item
