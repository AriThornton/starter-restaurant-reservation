import React from 'react'
import { today, previous, next } from '../utils/date-time'

const DashboardButtons = ({ date, setDate }) => {
  const day = today()
  const prevDay = previous(date)
  const nextDay = next(date)

  return (
    <div className='buttons d-flex justify-content-center ml-0'>
      <button className='btn btn-dark' onClick={() => setDate(prevDay)}>
        {' '}
        <i className='fas fa-chevron-left' /> Previous
      </button>
      <button className='btn btn-dark mx-3' onClick={() => setDate(day)}>
        Today
      </button>
      <button className='btn btn-dark' onClick={() => setDate(nextDay)}>
        Next <i className='fas fa-chevron-right' />
      </button>
    </div>
  )
}

export default DashboardButtons
