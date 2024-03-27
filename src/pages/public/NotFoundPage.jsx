import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="absolute text-center w-full h-full bg-slate-900 text-gray-200">
      <p className="text-4xl text-blue-500">404</p> 
      <h1>Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to='/'>Volver al inicio</Link>
    </div>
  )
}


