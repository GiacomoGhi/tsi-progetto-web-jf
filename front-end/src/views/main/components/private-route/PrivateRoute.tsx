import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute: React.FC<{ isAuth: boolean; onFail: () => void }> = ({ isAuth, onFail }) => {
  useEffect(() => {
    if (!isAuth) {
      onFail()
    }
  }, [])
  return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
