import React, { useState } from 'react'
import { listReservations } from '../utils/api'
import ReservationList from '../reservations/ReservationList'

import ErrorAlert from '../layout/ErrorAlert'

const Search = () => {
  const [reservations, setReservations] = useState([])
  const [input, setInput] = useState('')
  const [errors, setErrors] = useState(null)

  const onChange = (e) => setInput(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    const abortController = new AbortController()
    listReservations({ mobile_number: input }, abortController.signal)
      .then(setReservations)
      .catch((err) => {
        setErrors({ message: err.message })
      })
  }

  return (
    <div className='row justify-content-center'>
      <form className='col-lg-10' onSubmit={onSubmit}>
        <h1 className='text-center py-4'>Search Reservations</h1>

        <ErrorAlert error={errors} />
        <div className='form-group'>
          <label htmlFor='mobile_number'>Search by mobile number</label>
          <input
            name='mobile_number'
            className='form-control'
            onChange={onChange}
          />
        </div>
        <button className='btn btn-dark' type='submit'>
          Find
        </button>
        {reservations.length ? (
          reservations.map((reservation, index) => (
            <ReservationList reservation={reservation} key={index} />
          ))
        ) : (
          <h5 className='text-white mt-3'>No reservations found</h5>
        )}
      </form>
    </div>
  )
}

export default Search
