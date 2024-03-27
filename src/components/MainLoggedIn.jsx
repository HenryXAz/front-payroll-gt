import NavigationBar from "./NavigationBar"

// eslint-disable-next-line react/prop-types
const MainLoggedIn = ({children}) => {
  return (
    <main  className="ml-48 py-6" >
      <NavigationBar />
      {children}
    </main>
  )
}

export default MainLoggedIn
