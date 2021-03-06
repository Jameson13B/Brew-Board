import React, { useContext, useEffect } from 'react'
import { ElefantContext } from 'elefant-state'
import { FirebaseAPI } from './FirebaseAPI'
import { ACTIONS } from './State'
import { Modal } from './Modal'
import { CurrentBottles } from './CurrentBottles'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

export const App = () => {
  const [state, dispatch] = useContext(ElefantContext)
  const styles = getStyles()
  const today = new Date()

  useEffect(() => {
    const unsubscribe$ = FirebaseAPI.currentBatches().onSnapshot((res) => {
      let batches = []

      res.forEach(
        (batch) =>
          (batches = [
            ...batches,
            { id: batch.id, remaining: getDiff(batch.data()), ...batch.data() },
          ]),
      )

      dispatch({
        type: ACTIONS.LOAD_BATCHES,
        payload: batches.sort((a, b) => a.remaining - b.remaining),
      })
    })

    return () => unsubscribe$()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getDiff = (batch) => {
    return Math.ceil((batch.projected.toDate().getTime() - today.getTime()) / (1000 * 3600 * 24))
  }
  const formatDate = (date) => {
    return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`
  }

  return (
    <div style={{ textAlign: 'center', margin: '0 10px' }}>
      <h1 style={{ marginBottom: 10 }}>Utopia Brew Co. Brew Board</h1>
      <h3 style={{ marginTop: '0' }}>Upcoming Beers, Ciders, and Wines</h3>
      {/* This is the main view */}
      <div style={styles.group}>
        <CurrentBottles />
        <hr style={{ borderStyle: 'groove', marginBottom: 20, width: '85%' }} />
        {state.batches
          .filter((a) => a.status !== 'Bottled')
          .map((batch) => (
            <div
              key={batch.id}
              onClick={() => dispatch({ type: ACTIONS.SELECT_BATCH, payload: batch })}
              style={styles.batch}
            >
              <div style={styles.rowOne}>
                <h2 style={styles.noMargin}>{batch.name}</h2>

                <h2 style={styles.noMargin}>{batch.status || 'Pending'}</h2>
              </div>

              <div style={styles.rowTwo}>
                <div style={styles.cell}>
                  <h3>Start</h3>
                  <p>{formatDate(batch.start.toDate())}</p>
                </div>
                <div style={styles.cell}>
                  <h3>Projected</h3>
                  <p>{formatDate(batch.projected.toDate())}</p>
                </div>
                <div style={styles.cell}>
                  <h3>Left</h3>
                  <p>{batch.remaining} days</p>
                </div>
                <div style={styles.cellLast}>
                  <h3>OG</h3>
                  <p>{batch.original_grav || 'TBD'}</p>
                </div>
              </div>

              <div style={styles.rowThree}>
                <h3 style={styles.noMargin}>Notes</h3>
                <p>{batch.notes}</p>
              </div>
            </div>
          ))}
        <h4>** End of List **</h4>
      </div>
      {/* This is the modal view */}
      {state.showModal && (
        <Modal
          onClose={() => dispatch({ type: ACTIONS.CLOSE_MODAL })}
          selectedBatch={state.selectedBatch}
        />
      )}
    </div>
  )
}

const getStyles = () => ({
  group: {
    margin: '0 auto',
    maxWidth: 500,
    width: '100%',
  },
  batch: {
    border: '1px solid black',
    borderRadius: 10,
    cursor: 'pointer',
    marginBottom: 20,
  },
  rowOne: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid black',
    padding: 20,
    textAlign: 'left',
  },
  noMargin: {
    margin: 0,
  },
  rowTwo: {
    display: 'flex',
    justifyContent: 'space-evenly',
    borderBottom: '1px solid black',
  },
  cell: {
    borderRight: '1px solid black',
    flexGrow: '1',
  },
  cellLast: {
    flexGrow: '1',
  },
  rowThree: {
    textAlign: 'left',
    padding: '10px 20px',
  },
})
