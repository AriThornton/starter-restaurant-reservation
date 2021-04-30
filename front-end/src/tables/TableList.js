import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL as url, findReservation } from '../utils/api'

const TableList = ({ table, loadDashboard }) => {
  const [reservation, setReservation] = useState([])
  const { table_id, table_name, capacity, reservation_id } = table

  useEffect(() => {
    const abortController = new AbortController()
    reservation_id && findReservation(reservation_id).then(setReservation)
    return () => abortController.abort()
  }, [table, reservation_id])

  let badgeColor, badgeName

  if (reservation_id === null) {
    badgeColor = 'success'
    badgeName = 'free'
  } else {
    badgeColor = 'danger'
    badgeName = 'occupied'
  }

  const finishReservation = (e) => {
    e.preventDefault()

    window.confirm(
      'Is this table ready to seat new guests? This cannot be undone.'
    ) &&
      axios.delete(`${url}/tables/${table_id}/seat`).then((res) => {
        res.status === 200 && loadDashboard()
      })
  }

  return (
    <div className='card text-white  my-2 card-bg'>
      <div className='card-header d-flex align-items-center'>
        <h5 className='my-0'>{table_name}</h5>
        <div className='my-0 ml-auto ' data-table-id-status={table_id}>
          Status:{' '}
          <span className={`badge badge-pill badge-${badgeColor}`}>
            {badgeName}
          </span>
        </div>
      </div>
      <div className='card-body d-flex align-items-center'>
        <h5 className='card-title my-0'>
          {reservation_id
            ? `Reserved: ${reservation.last_name}, ${reservation.first_name} (${reservation.people})`
            : `Capacity: ${capacity}`}
        </h5>
        {reservation_id && (
          <button
            onClick={finishReservation}
            className='btn btn-danger ml-auto'
            data-table-id-finish={table_id}
          >
            <i className='fas fa-check-circle'></i> Finish
          </button>
        )}
      </div>
    </div>
  )
}

export default TableList
