import Modal from 'components/modal-wrapper/ModalWrapper'
import React, { useCallback, useEffect, useState } from 'react'

const LoginSingupWrapper = () => {
  const urlParams = new URLSearchParams(window.location.search).get('login')
  const [renderLoginForm, setRenderLoginForm] = useState(false)

  const handleClose = () => {
    setRenderLoginForm(false)
    const newUrl = window.location.href.split('?')[0]
    window.history.replaceState({}, document.title, newUrl)
  }

  useEffect(() => {
    if (urlParams) {
      setRenderLoginForm(true)
      console.log('ok')
    }
  }, [urlParams])

  const renderModal = useCallback(() => {
    return (
      <Modal isOpen={renderLoginForm} onClose={handleClose}>
        <h1>ciao</h1>
      </Modal>
    )
  }, [renderLoginForm])

  return renderModal()
}

export default LoginSingupWrapper
