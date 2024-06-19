import { useEffect, useState } from "react"
import Table from "../../components/shared/Table"
import { fetchIngestionOverview } from "../../api/workService";
import { useAuthHeaders } from "../../context/useAuthHeaders";

export default function AllocationOverview() {
  const [workItems, setWorkItems] = useState([]);
  const headers = useAuthHeaders();

  useEffect(() => {
    fetchIngestionOverview(headers).then(res => {
      setWorkItems(res)
    })
  })

  return (
    <div>
      <h3>Allocation Overview</h3>
      {workItems.length ? <Table rows={workItems} title='Overview' /> : <span>Loading...</span>}
    </div>
  )
}
