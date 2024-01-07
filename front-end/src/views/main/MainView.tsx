import React, { Suspense, useCallback, useEffect, useState } from 'react'
import AppNavigationMenu from './components/app-nav-menu/AppNavigationMenu'
import AppFooter from './components/footer/AppFooter'
import './MainView.styles.scss'
import { Route, Routes } from 'react-router-dom'
import HomeView from 'views/home/HomeView'
import App from 'App'

function MainView() {
  const { isInitialized } = App

  const [loading, setLoading] = useState(true)

  const initializeApp = useCallback(async () => {
    if (!isInitialized) {
      setLoading(true)

      const res = await App.initialize()

      console.log(res)

      setLoading(false)
    }
  }, [isInitialized])

  const loader = (
    <div>
      <h1>Loading ...</h1>
    </div>
  )

  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  return (
    <React.Fragment>
      {loading ? (
        loader
      ) : isInitialized ? (
        <Suspense fallback={loader}>
          <AppNavigationMenu />
          <main>
            <div className="root" id="app">
              <Routes>
                <Route path="/" element={<HomeView />} />
              </Routes>
            </div>
          </main>
          <AppFooter />
        </Suspense>
      ) : (
        <div>
          <h1>init failed</h1>
        </div>
      )}
    </React.Fragment>
  )
}

export default MainView
