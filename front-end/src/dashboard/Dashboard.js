import React, { useEffect, useState } from 'react'
import DashButtons from './DashButtons'
import ErrorAlert from '../layout/ErrorAlert'
import { listReservations, listTables } from '../utils/api'
import ReservationList from '../reservations/ReservationList'
import TableList from '../tables/TableList'

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)

  useEffect(loadDashboard, [date])

  function loadDashboard() {
    const abortController = new AbortController()
    setReservationsError(null)
    setTablesError(null)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
    listTables()
      .then((tables) => {
        return tables
      })
      .then(setTables)
      .catch(setTablesError)
    return () => abortController.abort()
  }

  return (
    <main>
      <h1 className='text-center pt-4'>Dashboard</h1>
      <h3 className='text-white text-center pb-4 mb-0'>
        Reservations for {date}
      </h3>

      <div className=' w-100'>
        <DashButtons date={date} setDate={setDate} />
        <ErrorAlert error={reservationsError} />
        <ErrorAlert error={tablesError} />
        <div className='container align-self-center'>
          <div className='row justify-content-around'>
            <div className='group col-lg-6 w-100'>
              <h3 className='text-light'>Reservations:</h3>
              <div className='group-item'>
                {reservations.length === 0 && (
                  <h5 className='text-white'>
                    There are no reservations for {date}
                  </h5>
                )}

                {reservations.map((reservation) => (
                  <ReservationList
                    key={reservation.reservation_id}
                    reservation={reservation}
                  />
                ))}
              </div>
            </div>

            <div className='group col-lg-5 w-100'>
              <h3 className='text-white'>Tables:</h3>
              <div className='group-item'>
                {tables.map((table) => (
                  <TableList
                    key={table.table_id}
                    table={table}
                    loadDashboard={loadDashboard}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
