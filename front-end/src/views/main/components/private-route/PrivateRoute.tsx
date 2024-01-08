import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute: React.FC<{ isAuth: boolean }> = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/?login=true" />
}

export default PrivateRoute
