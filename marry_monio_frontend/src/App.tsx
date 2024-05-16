import './App.css'
import { BrowserRouter, createBrowserRouter, Outlet, Route, RouterProvider, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import PathConstants from './components/route/pathConstants'

import routes from './components/route'

function App() {


  console.log("trying to laod app")

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: routes
    }
  ])



  return (
    <RouterProvider router={router}></RouterProvider>  
  )
}

export default App
