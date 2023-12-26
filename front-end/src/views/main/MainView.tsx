import React from 'react'
import AppNavigationMenu from './components/app-nav-menu/AppNavigationMenu'
import AppFooter from './components/footer/AppFooter'
import './MainView.styles.scss'
import { Route, Routes } from 'react-router-dom'
import HomeView from 'views/home/HomeView'

function MainView() {
  return (
    <div className="root" id="app">
      <AppNavigationMenu />
      <main>
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}

export default MainView
