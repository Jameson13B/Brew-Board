import React, { useState } from 'react'
import { css } from 'glamor'

export const Modal = ({ onClose, selectedBatch, children }) => {
  const styles = getStyles()
  const [form, setForm] = useState({
    ...selectedBatch,
    start: getDate(selectedBatch.start.toDate()),
    projected: getDate(selectedBatch.projected.toDate()),
  })
  function getDate(dateObject) {
    let month = dateObject.getMonth() + 1
    let date = dateObject.getDate()
    return (
      dateObject.getFullYear() +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      (date < 10 ? '0' + date : date)
    )
  }
  const handleChange = (e, name) => setForm({ ...form, [name]: e.target.value })
  const handleSubmit = () => console.log('Submitted')

  return (
    <div id="myModal" onClick={(e) => e.target.id === 'myModal' && onClose()} style={styles.modal}>
      <div className={css(styles.modalContent)}>
        <span onClick={onClose} className={css(styles.close)}>
          &times;
        </span>
        <div>
          <h3>Name</h3>
          <input onChange={(e) => handleChange(e, 'name')} style={styles.input} value={form.name} />
        </div>
        <div>
          {/* Change to dropdown. Planning, Fermenting, Cold Crashing, Botttled */}
          <h3>Status</h3>
          <input
            onChange={(e) => handleChange(e, 'status')}
            style={styles.input}
            value={form.status}
          />
        </div>
        <div>
          <h3>Projected</h3>
          <input
            onChange={(e) => handleChange(e, 'projected')}
            style={styles.input}
            type="date"
            value={form.projected}
          />
        </div>
        <div>
          <h3>OG</h3>
          <input
            onChange={(e) => handleChange(e, 'original_grav')}
            style={styles.input}
            value={form.original_grav}
          />
        </div>
        <div>
          <h3>Notes</h3>
          <span>
            <textarea
              onChange={(e) => handleChange(e, 'notes')}
              rows="7"
              style={styles.textarea}
              value={form.notes}
            />
          </span>
        </div>
        <button className={css(styles.button)} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  )
}

const getStyles = () => ({
  modal: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    margin: '15% auto',
    maxWidth: 500,
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
    ' h3': {
      marginBottom: 3,
      marginTop: 30,
    },
  },
  close: {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    ':hover, :focus': {
      color: 'black',
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
  input: {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    fontSize: '115%',
    outline: 'none',
    textAlign: 'center',
    width: 300,
  },
  textarea: {
    fontSize: '115%',
    outline: 'none',
    resize: 'none',
    maxWidth: 350,
    width: '100%',
  },
  button: {
    background: '#fff',
    border: '1px solid black',
    borderRadius: '5px',
    marginTop: 15,
    padding: '7px 30px',
    ':hover': {
      background: 'lightgreen',
    },
  },
})
