import Modal from 'components/modal-wrapper/ModalWrapper'
import './LoginSingupWrapper.styles.scss'
import React, { useCallback, useEffect, useState } from 'react'
import LoginForm from 'views/main/components/login-from/LoginForm'
import SingupForm from 'views/main/components/singup-form/SingupForm'
import ResetForm from '../reset-password-form/ResetPassword'

const LoginSingupWrapper: React.FC<{
  onClose: () => void
  onSuccess: () => void
  active: boolean
  confermation?: boolean
}> = ({ onSuccess, active, onClose, confermation }) => {
  const [singup, setSingup] = useState(false)

  const [reset, setReset] = useState(false)

  const handleClose = () => {
    setSingup(false)
    onClose()
  }

  const handleLogin = () => {
    setSingup(false)
    onSuccess()
  }

  const handleSingupClick = () => {
    setSingup(true)
  }

  const handleBackFromSingup = () => {
    setSingup(false)
  }

  const handleBackFromReset = () => {
    setReset(false)
  }

  return (
    <Modal isOpen={active} onClose={handleClose}>
      <div className="modalContainer">
        <h1>Welcome!</h1>
        {singup ? (
          <SingupForm onClick={handleBackFromSingup} onClose={handleClose} />
        ) : (
          <>
            {!reset ? (
              <>
                {confermation && <p>Email confermata correttamente, ora puoi accedere! :D</p>}
                <LoginForm onSuccess={handleLogin} />
                <div>
                  <button className="button" onClick={handleSingupClick}>
                    Registrati
                  </button>
                </div>
                <div>
                  <button
                    className="button"
                    onClick={() => {
                      setReset(true)
                    }}>
                    Password Dimenticata
                  </button>
                </div>
              </>
            ) : (
              <ResetForm onClose={handleBackFromReset} />
            )}
          </>
        )}
      </div>
    </Modal>
  )
}

export default LoginSingupWrapper
