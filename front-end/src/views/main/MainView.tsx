import React, { Suspense, useCallback, useEffect, useState } from 'react'
import AppNavigationMenu from './components/app-nav-menu/AppNavigationMenu'
import AppFooter from './components/footer/AppFooter'
import './MainView.styles.scss'
import { Route, Routes } from 'react-router-dom'
import HomeView from 'views/home/HomeView'
import App from 'App'
import NewsView from 'views/news/NewsView'
import CommunityView from 'views/community/CommunityView'
import ProfileView from 'views/profile/ProfileView'
import PrivateRoute from './components/private-route/PrivateRoute'

function MainView() {
  const { isInitialized, apiClient } = App

  const [loading, setLoading] = useState(true)
  const [isAtuh, setIsAuth] = useState(false)

  const initializeApp = useCallback(async () => {
    if (!isInitialized) {
      setLoading(true)

      await App.initialize()
    }

    if (isInitialized) {
      const response = await apiClient.loggedUser.check()

      if (!response.hasErrors && response.data && !response.data.error) {
        setIsAuth(true)
      }
    }
    setLoading(false)
  }, [isInitialized])

  // TODO add a real loader component
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
                <Route path="/news" element={<NewsView />} />
                <Route element={<PrivateRoute isAuth={isAtuh} />}>
                  <Route path="/community" element={<CommunityView />} />
                  <Route path="/profile" element={<ProfileView />} />
                </Route>
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
