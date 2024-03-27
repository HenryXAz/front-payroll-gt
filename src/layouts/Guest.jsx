import LoadingPage from '@/components/LoadingPage'
import { Navigation } from '@/components/Navigation'
import { authService } from '@/services/auth-services'

// react
import { useEffect, useState } from 'react'

// react router
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Guest = ({ children }) => { 
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(authService.getToken() && authService.getToken() !== 'undefined') {
      setIsAuth(true)
    }

    setLoading(false)
  }, [])

  if(loading) {
    return <LoadingPage />
  }

  if (isAuth) {
    return <Navigate to='/dashboard' /> 
  }

  return (
      <div className="absolute w-full h-full overflow-y-auto  bg-slate-900">
      <Navigation />
      <main className='max-w-7xl mx-auto'>{children}</main>
    </div>
  )
}

export default Guest

