import React from 'react'
import AppNavigationMenu from './components/app-nav-menu/AppNavigationMenu'
import AppFooter from './components/footer/AppFooter'
import './MainView.styles.scss'
import { Route, Routes } from 'react-router-dom'

function MainView() {
  return (
    <div className="root" id="app">
      <AppNavigationMenu />
      <main>
        <Routes>{/* <Route path='/' element={<Home/>}/> */}</Routes>
      </main>
      <AppFooter />
    </div>
  )
}

export default MainView
