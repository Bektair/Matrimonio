
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Page404 from './components/Layout/Page404'
import routes from "./components/route"

function App() {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Page404></Page404>,
      children: routes
    }
  ])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
