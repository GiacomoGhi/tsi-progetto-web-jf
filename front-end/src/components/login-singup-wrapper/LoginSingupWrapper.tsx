import Modal from 'components/modal-wrapper/ModalWrapper'
import './LoginSingupWrapper.styles.scss'
import React, { useCallback, useEffect, useState } from 'react'
import LoginForm from 'components/login-from/LoginForm'

const LoginSingupWrapper = () => {
  const urlParams = new URLSearchParams(window.location.search).get('login')
  const [renderLoginForm, setRenderLoginForm] = useState(false)

  const handleClose = () => {
    const newUrl = window.location.href.split('?')[0]
    window.history.replaceState({}, document.title, newUrl)
    setRenderLoginForm(false)
  }

  useEffect(() => {
    if (urlParams) {
      setRenderLoginForm(true)
    }
  }, [urlParams])

  const renderModal = useCallback(() => {
    return (
      <Modal isOpen={renderLoginForm} onClose={handleClose}>
        <div className="modalContainer">
          <h1>Welcome</h1>
          <LoginForm />
          <div>
            <button className="button">Registrati</button>
          </div>
        </div>
      </Modal>
    )
  }, [renderLoginForm])

  return renderModal()
}

export default LoginSingupWrapper
