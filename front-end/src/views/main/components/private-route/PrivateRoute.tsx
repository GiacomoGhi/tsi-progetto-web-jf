import App from 'App'
import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {
  const { apiClient } = App

  const [isAtuh, setIsAuth] = useState(false)

  const isUserLoggedIn = async () => {
    const response = await apiClient.loggedUser.check()
    if (!response.hasErrors && response.data && !response.data.error) {
      setIsAuth(true)
    }
  }

  return isAtuh ? <Outlet /> : <Navigate to="/?login=true" />
}

export default PrivateRoute
