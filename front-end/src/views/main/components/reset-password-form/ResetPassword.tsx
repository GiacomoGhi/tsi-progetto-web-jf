import App from 'App'
import React, { FormEvent, useState } from 'react'
//import './LoginForm.styles.scss'

const ResetForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [failedReset, setFailedReset] = useState(false)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetPassword()
  }
  const resetPassword = async () => {
    setFailedReset(false)
    const { auth } = App
    const response = await auth.reset({ email: email })
    if (!response.hasErrors && response.data) {
      setDone(true)
    } else {
      setFailedReset(true)
    }
  }
  return (
    <div>
      {!done ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Indirizzo email"
              type="email"
              onChange={e => {
                setEmail(e.target.value)
              }}
              required
            />
          </div>
          {failedReset && <p className="errorMessage">Account not found</p>}
          <button className="button" type="submit">
            Procedi
          </button>
        </form>
      ) : (
        <p>Nuova Password Trasmessa via email. Cambiala e Ricordatela!!! :D</p>
      )}
      <div>
        <button className="button" onClick={onClose}>
          {'< < Back'}
        </button>
      </div>
    </div>
  )
}

export default ResetForm
