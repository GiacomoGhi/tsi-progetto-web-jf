import React, { useEffect, useState } from 'react'
import './ProfileView.styles.scss'
import App from 'App'
import { UserDto } from 'infrastructure/api-client/dto/user.dto'

const ProfileView: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [fromIsChanged, setFormIsChanged] = useState(false)
  const [formData, setFormData] = useState<Partial<UserDto>>({
    email: '',
    name: '',
    surname: '',
    nickName: '',
    password: ''
  })

  const fetchData = async (from: number, to: number) => {
    const { apiClient } = App

    const response = await apiClient.loggedUser.check()

    if (!response.hasErrors && response.data) {
      const initialFormData = response.data as Partial<UserDto>

      setFormData({
        email: initialFormData.email,
        name: initialFormData.name,
        surname: initialFormData.surname,
        nickName: initialFormData.nickName
      })
    }
  }

  const handleLogout = () => {
    onLogout()
  }

  useEffect(() => {
    fetchData(0, 20)
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between mx-3 mx-sm-5 mt-3">
        <h1>I Miei Dati</h1>
        <button className="button" onClick={handleLogout}>
          {'<< Logout >>'}
        </button>
      </div>
      <div className="borderContainer">
        <form className="mt-3">
          <div className="row mb-sm-3">
            <div className="col-sm-6 mb-3">
              <input
                readOnly
                defaultValue={formData.email}
                className="form-control"
                placeholder="Indirizzo email"
                type="email"
              />
            </div>
            <div className="col-sm-6 mb-3">
              <input
                defaultValue={formData.nickName}
                className="form-control"
                placeholder="Nickname"
                type="text"
                onChange={e => {
                  setFormData({ ...formData, nickName: e.target.value })
                }}
                required
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 mb-3">
              <input
                defaultValue={formData.name}
                className="form-control"
                placeholder="Nome"
                type="text"
                onChange={e => {
                  setFormData({ ...formData, name: e.target.value })
                }}
                required
              />
            </div>
            <div className="col-sm-6 mb-3">
              <input
                defaultValue={formData.surname}
                className="form-control"
                placeholder="Cognome"
                type="text"
                onChange={e => {
                  setFormData({ ...formData, surname: e.target.value })
                }}
                required
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                onChange={e => {
                  setFormData({ ...formData, password: e.target.value })
                }}
                required
              />
            </div>
            <div className="col-sm-6 px-sm-5">
              <div className="d-flex justify-content-between secondaryBorderContainer">
                <span>{`POST ${0}`}</span>
                <span>{`Commenti ${0}`}</span>
                <div></div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mx-0 mx-sm-5">
            <button className="button ms-4" type="submit">
              {'< < Annulla Modifiche'}
            </button>
            <button className="button ms-4" type="submit">
              {'Salva Modifiche > >'}
            </button>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-center mb-5 pb-5 mt-3">
        <button className="button">{'Eliminia il Mio Account :C'}</button>
      </div>
    </>
  )
}

export default ProfileView
