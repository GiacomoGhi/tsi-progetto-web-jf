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
import LoginSingupWrapper from 'views/main/components/login-singup-wrapper/LoginSingupWrapper'

function MainView() {
  const { isInitialized, apiClient, auth } = App

  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const [renderLogin, setRenderLogin] = useState(false)
  const [confermation, setConfermation] = useState(false)

  const initializeApp = useCallback(async () => {
    if (!isInitialized) {
      setLoading(true)

      await App.initialize()
    }

    if (isInitialized) {
      const response = await apiClient.loggedUser.check()

      if (!response.hasErrors && response.data && !response.data.error) {
        setIsAuth(true)
      } else {
        const urlSearchParams = new URLSearchParams(window.location.search)
        if (urlSearchParams.has('token')) {
          const token = urlSearchParams.get('token') || ''
          console.log(token)

          confirmEmail(token)

          const newUrl = window.location.href.split('?')[0]
          window.history.replaceState({}, document.title, newUrl)
        }
      }
    }
    setLoading(false)
  }, [isInitialized])

  const confirmEmail = async (token: string) => {
    const response = await auth.confirmEmail(token)
    if (!response.hasErrors && response.data) {
      setRenderLogin(true)
      setConfermation(true)
    }
  }

  const handleSuccess = async () => {
    const response = await apiClient.loggedUser.check()

    if (!response.hasErrors && response.data && !response.data.error) {
      setIsAuth(true)
      setRenderLogin(false)
    }
  }

  const handleFail = () => {
    setRenderLogin(true)
  }

  const handleClose = () => {
    setRenderLogin(false)
    setConfermation(false)
  }

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
                <Route element={<PrivateRoute isAuth={isAuth} onFail={handleFail} />}>
                  <Route path="/community" element={<CommunityView />} />
                  <Route path="/profile" element={<ProfileView />} />
                </Route>
              </Routes>
              <LoginSingupWrapper
                confermation={confermation}
                active={renderLogin}
                onSuccess={handleSuccess}
                onClose={handleClose}
              />
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
