import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL as url, findReservation } from '../utils/api'

import { useHistory, useParams } from 'react-router'
import ErrorAlert from '../layout/ErrorAlert'

const ReservationForm = ({ setDate }) => {
  const history = useHistory()
  const { reservation_id } = useParams()
  const [reservation, setReservation] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: '',
  })
  const [reservationsError, setReservationsError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    reservation_id && findReservation(reservation_id).then(setReservation)
    return () => abortController.abort()
    // eslint-disable-next-line
  }, [])

  const { first_name, last_name, mobile_number, reservation_time } = reservation

  let { reservation_date, people } = reservation

  reservation.reservation_date = reservation.reservation_date.slice(0, 10)

  // Add Reservation
  const addReservation = (reservation) => {
    axios
      .post(`${url}/reservations`, { data: reservation })
      .then((res) => {
        res.status === 201 &&
          history.push(`/dashboard?date=${reservation.reservation_date}`)
      })
      .catch((err) => {
        setReservationsError({ message: err.response.data.error })
      })
  }

  // Update Reservation
  const updateReservation = async (reservation) => {
    axios
      .put(`${url}/reservations/${reservation.reservation_id}`, {
        data: reservation,
      })
      .then((res) => {
        res.status === 200 &&
          history.push(`/dashboard?date=${reservation.reservation_date}`)
      })
      .catch((err) => {
        setReservationsError({ message: err.response.data.error })
      })
  }

  const onChange = (e) =>
    setReservation({ ...reservation, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setReservationsError(null)
    reservation.people = Number(reservation.people)

    if (!reservation_id) {
      addReservation(reservation)
    } else {
      updateReservation(reservation)
    }
    setDate(reservation.reservation_date)
  }

  return (
    <div className='row justify-content-center'>
      <form className='col-lg-10' onSubmit={onSubmit}>
        <h1 className='text-center py-4'>
          {reservation.reservation_id ? 'Edit' : 'New'} Reservation
        </h1>

        <ErrorAlert error={reservationsError} />
        <div className='form-group'>
          <label htmlFor='first_name'>First Name</label>
          <input
            className='form-control'
            type='text'
            name='first_name'
            placeholder='Enter your first name'
            value={first_name}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='last_name'>Last Name</label>
          <input
            className='form-control'
            type='text'
            name='last_name'
            placeholder='Enter your last name'
            value={last_name}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='mobile_number'>Mobile Number</label>
          <input
            className='form-control'
            type='tel'
            name='mobile_number'
            placeholder='xxx-xxx-xxxx'
            value={mobile_number}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='reservation_date'>Reservation Date</label>
          <input
            className='form-control'
            type='date'
            name='reservation_date'
            id='reservation_date'
            value={reservation_date}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='reservation_time'>Time</label>
          <input
            className='form-control'
            type='time'
            name='reservation_time'
            id='reservation_time'
            value={reservation_time}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='people'>Party Size</label>
          <input
            className='form-control'
            type='text'
            name='people'
            id='people'
            placeholder="Please enter your party's size"
            value={people}
            onChange={onChange}
            required
          />
        </div>

        <div className='buttons mt-2'>
          <button className='btn btn-dark mr-2' type='submit'>
            Submit
          </button>

          <button
            onClick={() => history.goBack()}
            className='btn btn-secondary'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReservationForm
