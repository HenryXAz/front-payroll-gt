import Guest from '@/layouts/Guest'
import { Link } from 'react-router-dom'

export const Home = () => (
  <Guest>
    <h1 className='my-6 text-center text-5xl font-bold text-gray-200'>
      Payroll Platform
    </h1>
    <div className='flex mx-auto w-full justify-center gap-4'>
      <Link
        to='/register'
        className='block p-2 px-3 text-gray-200 rounded-full hover:rounded-full bg-violet-800'
      >
        Prueba Gratis
      </Link>
      <a
        href='#'
        className='block p-2 px-3 text-gray-200 rounded-full hover:rounded-full border border-gray-600 bg-gray-800'
      >
        Conocenos
      </a>
    </div>
  </Guest>
)
