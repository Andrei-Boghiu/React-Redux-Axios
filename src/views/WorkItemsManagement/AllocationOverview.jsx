import PropTypes from "prop-types";
import { useEffect, useState } from "react"
import Table from "../../components/shared/Table"
import { fetchIngestionOverview, removeItemsAllocation } from "../../api/workService";
import { useAuthHeaders } from "../../context/useAuthHeaders";
import Spinner from "../../components/Loaders/Spinner";

export default function AllocationOverview() {
  const [workItems, setWorkItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(1);
  const headers = useAuthHeaders();

  useEffect(() => {
    setLoading(true)
    fetchIngestionOverview(headers).then(res => {
      setWorkItems(res)
    }).finally(() => setLoading(false))
  }, [headers, trigger]);


  const WorkItemActions = ({ rowData }) => {
    const [isLoading, setLoading] = useState(false);
    const aux_id = rowData?.aux_id;

    const handleItemAction = async () => {
      try {
        setLoading(true);
        const serverRes = await removeItemsAllocation(headers, [{ aux_id }]);
        const message = serverRes?.message;

        if (message) {
          alert(message)
        } else {
          alert('Success')
        }

      } catch (error) {
        console.error(error);
        alert('There was an error!');
      } finally {
        setLoading(false);
        setTrigger((prev) => prev + 1);
      }
    }

    if (!aux_id) {
      return <button disabled={true}>Data Err</button>
    }
    return (
      <>
        <button
          onClick={handleItemAction}
          className="table-button"
          disabled={isLoading}
        >
          {isLoading ? 'Loading' : 'Remove'}
        </button>
      </>
    );
  };

  WorkItemActions.propTypes = {
    rowData: PropTypes.object.isRequired,
  };

  return (
    <div>
      {
        loading ? <Spinner />
          : workItems.length
            ? <Table
              rows={workItems}
              title={`Overview - Total ${workItems.length}`}
              actions={[WorkItemActions]}
            />
            : <span>No items to show...</span>}
    </div>
  )
}
