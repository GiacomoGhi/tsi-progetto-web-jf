import App from 'App'
import React, { FormEvent, useState } from 'react'
import { SingUpFormDto } from 'types/SingUpFormDto'

const SingupForm: React.FC<{ onClick: () => void; onClose: () => void }> = ({ onClick, onClose }) => {
  const [formData, setFormData] = useState<SingUpFormDto>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    nickName: ''
  })
  const [successfullSingup, setSuccessfullSingup] = useState(false)
  const [displayError, setDisplayError] = useState(false)

  const handleClick = () => {
    onClick()
  }

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    singup()
  }

  const singup = async () => {
    setDisplayError(false)
    const { auth } = App
    const response = await auth.singup(formData)

    if (!response.hasErrors && response.data) {
      setSuccessfullSingup(true)
    } else {
      setDisplayError(true)
    }
  }

  return (
    <div>
      {!successfullSingup ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Indirizzo email"
              type="email"
              onChange={e => {
                setFormData({ ...formData, email: e.target.value })
              }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Nickname"
              type="text"
              onChange={e => {
                setFormData({ ...formData, nickName: e.target.value })
              }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Nome"
              type="text"
              onChange={e => {
                setFormData({ ...formData, firstName: e.target.value })
              }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Cognome"
              type="text"
              onChange={e => {
                setFormData({ ...formData, lastName: e.target.value })
              }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="password"
              type="password"
              onChange={e => {
                setFormData({ ...formData, password: e.target.value })
              }}
              required
            />
          </div>
          <div>
            <button className="button" onClick={handleClick}>
              {'< < Back'}
            </button>
            <button className="button ms-4" type="submit">
              Registrati
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>La tua registrazione è avvenuta con successo.</p>
          <p>Una email di conferma è stata inviata.</p>
          <button className="button" onClick={handleClose}>
            {'Close'}
          </button>
        </>
      )}
      {displayError && <p className="errorMessage">Registrazione non riuscita, riprova</p>}
    </div>
  )
}

export default SingupForm
