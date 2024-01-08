import App from 'App'
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {
  const { auth } = App
  const deleteMe = true
  return !deleteMe ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
