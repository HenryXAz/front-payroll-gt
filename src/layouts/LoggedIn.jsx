// services
import LoadingPage from '@/components/LoadingPage'
import { authService } from '@/services/auth-services'

// react
import { useEffect, useState } from 'react'

// react router
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const LoggedIn = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authService.getToken() && authService.getToken() !== 'undefined') {
      setIsAuth(true)
    }

    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingPage />
  }

  if (!isAuth) {
    return <Navigate to='/login' />
  }

  return <>{children}</>
}

export default LoggedIn
