import React from 'react'
import AppNavigationMenu from './components/app-nav-menu/AppNavigationMenu'
import AppFooter from './components/footer/AppFooter'

function MainView() {
  return (
    <div id="app">
      <AppNavigationMenu />
      <main>{/* <router-view></router-view> */}</main>
      <AppFooter />
    </div>
  )
}

export default MainView
