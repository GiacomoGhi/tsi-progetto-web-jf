import React from 'react'
import AppNavigationMenu from './components/app-nav-menu/AppNavigationMenu'
import AppFooter from './components/footer/AppFooter'
import './MainView.styles.scss'
function MainView() {
  return (
    <div className="root" id="app">
      <AppNavigationMenu />
      <main>{/* <router-view></router-view> */}</main>
      <AppFooter />
    </div>
  )
}

export default MainView
