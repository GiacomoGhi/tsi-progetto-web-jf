import React, { ChangeEvent, FormEvent, useState } from 'react'
import './LoginForm.styles.scss'
import App from 'App'

const LoginForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [failedLogin, setFailedLogin] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login()
  }

  const handleFail = () => {
    setFailedLogin(true)
  }

  const login = async () => {
    const { auth } = App
    const res = await auth.login(formData.email, formData.password)
    if (res) {
      onSuccess()
    } else {
      handleFail()
    }
  }

  //TODO handle error
  //TODO rerun authme on success
  /**
   * transfer is auth state to App instance
   */

  return (
    <div>
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
            placeholder="password"
            type="password"
            onChange={e => {
              setFormData({ ...formData, password: e.target.value })
            }}
            required
          />
        </div>
        {failedLogin && <p style={{ color: 'red' }}>Wrong email or password</p>}
        <button className="button" type="submit">
          Accedi
        </button>
      </form>
      <div>
        <button className="button">Password Dimenticata</button>
      </div>
    </div>
  )
}

export default LoginForm
