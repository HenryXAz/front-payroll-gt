import { Navigation } from '@/components/Navigation'

// eslint-disable-next-line react/prop-types
const Guest = ({ children }) => {
  return (
      <div className="absolute w-full h-full  bg-slate-900">
      <Navigation />
      <main className='max-w-7xl mx-auto'>{children}</main>
    </div>
  )
}

export default Guest

