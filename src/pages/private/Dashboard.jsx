import LoggedIn from '@/layouts/LoggedIn';
import { useEffect, useState } from 'react';

export const Dashboard = () => {
  const [user, setUser] = useState({})

  const ROLES = {
    'user': 'empleado',
    'admin': 'Administrador de Empresa',
  }

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('data-user')))

  }, [])

  return (
    <LoggedIn>
      <h1 className='text-center font-bold text-xl'>{user.username}</h1>
      <p className='text-center'>Bienvenido eres un {ROLES[user.role]}</p>
    </LoggedIn>
  )
}

export default Dashboard;