import LoggedIn from '@/layouts/LoggedIn';

import { Link } from 'react-router-dom';
import { AuthNavigation } from '../../components/AuthNavigation';


export const Dashboard = () => {
  return (
    <LoggedIn>
    <AuthNavigation/>
      <h1>Bienvenido al Dashboard (private)</h1>

      <Link to='/'>Volver al inicio</Link>
    </LoggedIn>
  )
}

export default Dashboard;