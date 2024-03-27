// react
import { useEffect, useState } from 'react'

// react router
import { useLocation, Link } from 'react-router-dom'

const NavigationBar = () => {
  const [menu, setMenu] = useState({})
  const location = useLocation()

  const findMenu = () => {
    const menus = JSON.parse(sessionStorage.getItem('menu'))

    let menuObject = {}
    for (let i = 0; i < menus.length; i++) {
      for (let j = 0; j < menus[i].submenu.length; j++) {
        if (menus[i].submenu[j].path === location.pathname) {
          console.log('menu', menus[i].submenu[j].name)
          menuObject = {
            path: menus[i].submenu[j].path,
            name: menus[i].submenu[j].name,
          }
        }
      }
    }
    setMenu(menuObject)
  }

  useEffect(() => {
    findMenu()
  }, [])

  return (
    <nav className='flex rounded-xl gap-2 mb-5 bg-gray-200 max-w-7xl p-2'>
      <p className='font-bold'>⌂ {` >`}</p>
      <ul className='flex gap-2'>
        <li>
          <Link to={menu.path}>{menu.name}</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar

