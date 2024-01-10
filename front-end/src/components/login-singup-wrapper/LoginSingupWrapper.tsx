import Modal from 'components/modal-wrapper/ModalWrapper'
import './LoginSingupWrapper.styles.scss'
import React, { useCallback, useEffect, useState } from 'react'
import LoginForm from 'components/login-from/LoginForm'

const LoginSingupWrapper: React.FC<{ onClose: () => void; onSuccess: () => void; active: boolean }> = ({
  onSuccess,
  active,
  onClose
}) => {
  const handleClose = () => {
    onClose()
  }

  const handleLogin = () => {
    onSuccess()
  }

  const renderModal = useCallback(() => {
    return (
      <Modal isOpen={active} onClose={handleClose}>
        <div className="modalContainer">
          <h1>Welcome</h1>
          <LoginForm onSuccess={handleLogin} />
          <div>
            <button className="button">Registrati</button>
          </div>
        </div>
      </Modal>
    )
  }, [active])

  return renderModal()
}

export default LoginSingupWrapper
