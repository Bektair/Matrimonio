
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import PathConstants from './components/route/pathConstants'

import routes from './components/route'
import NotFound from './pages/Errorpages/NotFound'
import Auth0ProviderWithNavigate from './features/Auth/auth-WITH-navigate'

function App() {


  console.log("trying to laod app")



  const router = createBrowserRouter([
    {
      element: <Auth0ProviderWithNavigate />,
      errorElement: <NotFound></NotFound>,
      children: routes,
    }
  ])


  return (
    <RouterProvider router={router}></RouterProvider>  
  )
}

export default App
