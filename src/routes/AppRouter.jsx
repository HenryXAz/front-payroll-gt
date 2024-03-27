
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthRoute } from '../routes/AuthRoute';


import {
  Payroll,
  Profile,
  Store,
  Dashboard,
  Company,
} from '../pages/private'
import { Login,Home, Uikit, Register, NotFound} from '../pages/public';
import Positions from '@/pages/private/Positions';
import Departments from '@/pages/private/Departments';
import Employee from '@/pages/private/Employee';


const AppRouter = () => {
  return (

    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/uikit' element={<Uikit />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/login' element={< Login/>}/>


{/* ----------PRIVATE ROUTES-------- */}
      <Route path='/dashboard' element={<AuthRoute>< Dashboard/></AuthRoute>}/>
      <Route path='/profile' element={<AuthRoute><Profile /></AuthRoute>}/>
      <Route path='/company' element={<AuthRoute>< Company/></AuthRoute>}/>
      <Route path='/employees' element={<AuthRoute><Employee /></AuthRoute>}/>
      <Route path='/positions' element={<AuthRoute><Positions /></AuthRoute>}/>  
      <Route path='/departaments' element={<AuthRoute><Departments /></AuthRoute>}/>
      <Route path='/Payroll' element={<AuthRoute> <Payroll/> </AuthRoute>}/>
      <Route path='/store' element={<AuthRoute>< Store/></AuthRoute>}/>
    </Routes>
    </>
  )
}

export default AppRouter