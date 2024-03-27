// services
import LoadingPage from '@/components/LoadingPage'
import { authService } from '@/services/auth-services'
import Sidebar from '@/components/Sidebar'

// react
import { useEffect, useState } from 'react'

// react router
import { Navigate } from 'react-router-dom'
import MainLoggedIn from '@/components/MainLoggedIn'

// eslint-disable-next-line react/prop-types
const LoggedIn = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState({})
  const [user, setUser] = useState('')

  useEffect(() => {
    if (authService.getToken() && authService.getToken() !== 'undefined') {
      setIsAuth(true)
    }

    setMenu(JSON.parse(sessionStorage.getItem('menu')))
    setUser(JSON.parse(sessionStorage.getItem('data-user')))

    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingPage />
  }

  if (!isAuth) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <Sidebar menu={menu} user={user} />

      <MainLoggedIn>
        {children}
      </MainLoggedIn>
      {/* <main className="ml-48 py-6">{children}</main> */}
    </>
  )
}

export default LoggedIn
