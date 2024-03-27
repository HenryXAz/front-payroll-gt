// Navigation.jsx
import { Link, useLocation } from 'react-router-dom'

export const Navigation = () => {
  const location = useLocation()

  return (
    <>
      <nav className='border-gray-200 bg-gray-transparent'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link to='/' className='p-2 px-3 text-gray-200'>
            <h2 className='text-2xl'>Payroll</h2>
          </Link>
          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-transparent md:bg-transparent'>
              <li>
                <a
                  href='#'
                  className='bg-transparent hover:rounded block py-2 px-3 roundec hover:text-blue-500 text-gray-200'
                >
                  Funcinalidades
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='bg-transparent hover:rounded block py-2 px-3 roundec hover:text-blue-500 text-gray-200'
                >
                  Soluciones
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='bg-transparent hover:rounded block py-2 px-3 roundec hover:text-blue-500 text-gray-200'
                >
                  Opiniones
                </a>
              </li>

              {location.pathname !== '/login' && (
                <li>
                  <Link
                    to='/login'
                    className='bg-slate-800 border border-gray-600 rounded-full hover:rounded-full block py-2 px-3 roundec hover:text-blue-500 text-gray-200'
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
