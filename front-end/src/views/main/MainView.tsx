import React, { Suspense, useCallback, useEffect, useState } from 'react'
import AppNavigationMenu from './components/app-nav-menu/AppNavigationMenu'
import AppFooter from './components/footer/AppFooter'
import './MainView.styles.scss'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomeView from 'views/home/HomeView'
import App from 'App'
import NewsView from 'views/news/NewsView'
import CommunityView from 'views/community/CommunityView'
import ProfileView from 'views/profile/ProfileView'
import PrivateRoute from './components/private-route/PrivateRoute'
import LoginSingupWrapper from 'views/main/components/login-singup-wrapper/LoginSingupWrapper'
import ArticleDetailView from 'views/article-details/ArticleDetailView'
import { UserDto } from 'infrastructure/api-client/dto/user.dto'

function MainView() {
  const { isInitialized, apiClient } = App
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const [renderLogin, setRenderLogin] = useState(false)
  const [confermation, setConfermation] = useState(false)
  const [userId, setUserId] = useState('')

  const initializeApp = useCallback(async () => {
    if (!isInitialized) {
      setLoading(true)

      await App.initialize()
    }

    if (isInitialized) {
      await checkAuth()
    }
    setLoading(false)
  }, [isInitialized])

  const checkAuth = async () => {
    const response = await apiClient.loggedUser.check()

    if (!response.hasErrors && response.data && !response.data.error) {
      const user = response.data as unknown as UserDto
      setUserId(user.id)
      setIsAuth(true)
      setRenderLogin(false)
    } else {
      setIsAuth(false)
    }
  }

  const handleSuccess = async () => {
    const response = await apiClient.loggedUser.check()

    if (!response.hasErrors && response.data && !response.data.error) {
      const user = response.data as unknown as UserDto
      setUserId(user.id)
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

  const handleLogout = () => {
    const { auth } = App
    setIsAuth(false)
    auth.logout()
    navigate('/')
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
                  <Route path="/profile" element={<ProfileView onLogout={handleLogout} />} />
                  <Route path="/article-detail/:articleId" element={<ArticleDetailView userId={userId} />} />
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
