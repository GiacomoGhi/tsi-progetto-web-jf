import React, { useState } from 'react'
import { SingUpFormDto } from 'types/SingUpFormDto'
import './ProfileView.styles.scss'

function ProfileView() {
  const [formData, setFormData] = useState<SingUpFormDto>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    nickName: '',
    profession: ''
  })
  return (
    <>
      <div className="d-flex justify-content-between mx-0 mx-sm-5 mt-3">
        <h1>I Miei Dati</h1>
        <button className="button">{'<< Logout >>'}</button>
      </div>
      <div className="borderContainer">
        <form className="mt-3">
          <div className="row mb-3">
            <div className="col-sm-6 mb-3">
              <input readOnly className="form-control" placeholder="Indirizzo email" type="email" />
            </div>
            <div className="col-sm-6 mb-3">
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
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 mb-3">
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
            <div className="col-sm-4 mb-3">
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
            <div className="col-sm-4 mb-3">
              <input
                className="form-control"
                placeholder="Professione"
                type="text"
                onChange={e => {
                  setFormData({ ...formData, profession: e.target.value })
                }}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
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
