import React, { useContext, useEffect, useState } from 'react'
import { ElefantContext } from 'elefant-state'

export const CurrentBottles = () => {
  const [state] = useContext(ElefantContext)
  const [readyBatches, setReadyBatches] = useState([])
  const styles = getStyles()

  useEffect(() => {
    const bottled = state.batches.filter((batch) => batch.status === 'Bottled')

    setReadyBatches(bottled)
  }, [state.batches])

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Current Bottles:</h2>
      {readyBatches.length === 0 && <h3>*Nothing Current. See Upcoming Below</h3>}
      {readyBatches.map((batch) => {
        return (
          <div>
            <div style={styles.topRow}>
              <h3 style={styles.name}>{batch.name}</h3>
              <h4 style={styles.abv}>{batch.abv || 'TBD'}</h4>
            </div>
            <p style={styles.notes}>{batch.notes}</p>
          </div>
        )
      })}
    </div>
  )
}

const getStyles = () => ({
  container: {
    border: '1px solid black',
    borderRadius: 10,
    marginBottom: 20,
    padding: '20px 20px 0px',
    textAlign: 'left',
  },
  title: {
    marginBottom: 10,
    marginTop: 0,
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  name: {
    margin: 0,
  },
  abv: {
    color: 'slategrey',
    fontStyle: 'italic',
    margin: 0,
  },
  notes: {
    marginBottom: 0,
    paddingBottom: 20,
    marginTop: 5,
  },
})
