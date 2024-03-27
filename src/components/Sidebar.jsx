import { Link } from 'react-router-dom'

const Sidebar = ({ menu, user }) => {
  return (
    <>
      <aside
        id='sidebar-multi-level-sidebar'
        className='py-6 px-4 fixed top-0 left-0 z-40 w-[200px] h-screen transition-transform -translate-x-full sm:translate-x-0'
        aria-label='Sidebar'
      >
        <div className='h-full px-4 py-6 overflow-y-auto bg-gray-800 rounded-xl'>
          <Link className='flex flex-col items-center mb-4 text-gray-200'>
            <img
              width='100'
              className='rounded-full'
              src={user.picture}
              alt={user.email}
            />
            <p>{user.username}</p>
          </Link>

          <ul className='space-y-2 font-medium'>
            {menu.map(option => (
              <div key={option.name}>
                <li>
                  <button
                    href={option.path}
                    className='flex w-full items-center p-2 text-gray-200 rounded-lg hover:bg-gray-900 hover:bg-gray-700 group'
                  >
                    <span className='ms-3'>{option.name}</span>
                  </button>

                  {option.submenu && (
                    <ul>
                      {option.submenu.map((submenu, index) => (
                        <li key={index}>
                          <Link
                            to={submenu.path}
                            className='flex w-full pl-6  items-center p-2 text-gray-200 rounded-lg hover:bg-gray-900 hover:bg-gray-700 group'
                          >
                            {submenu.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
