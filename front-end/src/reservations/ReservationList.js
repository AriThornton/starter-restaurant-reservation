import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL as url } from '../utils/api'

const ReservationList = ({ reservation }) => {
  const history = useHistory()
  const {
    reservation_id,
    first_name,
    last_name,
    people,
    reservation_time,
    status,
  } = reservation

  const cancelReservation = () => {
    window.confirm(
      'Do you want to cancel this reservation? This cannot be undone.'
    ) &&
      axios
        .put(`${url}/reservations/${reservation_id}/status`, {
          data: { status: 'cancelled' },
        })
        .then((res) => {
          res.status === 200 && history.push('/')
        })
  }

  return (
    <div className='card card-bg text-white my-2'>
      <div className='card-header d-flex align-items-center'>
        <h5 className='my-0'>
          {reservation_time.slice(0, 5)} - {last_name}, {first_name}
        </h5>
        <p className='ml-auto my-0'>Party: {people}</p>
      </div>
      <div className='card-body d-flex align-items-center'>
        <h5 data-reservation-id-status={reservation_id} className='my-0'>
          Status: {status.toUpperCase()}
        </h5>
        <div className='d-inline-block ml-auto row row-cols-1'>
          {status === 'booked' && (
            <Fragment>
              <div className='col mb-2 justify-content-between'>
                <Link
                  to={`/reservations/${reservation_id}/seat`}
                  className='btn btn-dark d-block d-md-inline'
                >
                  <i className='fas fa-arrow-circle-down'></i> Seat
                </Link>{' '}
                <Link
                  to={`/reservations/${reservation_id}/edit`}
                  className='btn btn-dark d-block d-md-inline'
                >
                  <i className='fas fa-pencil-alt'></i> Edit
                </Link>
              </div>
              <div className='col'>
                <button
                  data-reservation-id-cancel={reservation_id}
                  onClick={cancelReservation}
                  className='btn btn-danger d-block d-md-inline w-100'
                >
                  <i className='fas fa-ban'></i> Cancel
                </button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReservationList
