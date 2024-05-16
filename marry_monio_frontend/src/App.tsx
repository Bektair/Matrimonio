import './App.css'
import { BrowserRouter, createBrowserRouter, Outlet, Route, RouterProvider, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import PathConstants from './components/route/pathConstants'
import React from 'react'
import NotFound from './pages/Errorpages/NotFound'
import { AuthenticationGuard } from './features/Auth/authentication-guard'
import Home from "./pages/Home/home"
import Login from "./pages/Auth/login"
import Ceremony from "./pages/Ceremony/ceremony"
import Posts from "./pages/Posts/posts"
import Reception from "./pages/Reception/reception"
import RSVP from "./pages/RSVP/rsvp"
import Register from "./pages/Auth/register"

function App() {


  console.log("trying to laod app")




  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathConstants.Login} element={<Login></Login>}></Route>
        <Route path={PathConstants.Register} element={<Register></Register>}></Route>
        <Route path={PathConstants.Ceremony} element={<Ceremony></Ceremony>}></Route>
        <Route path={PathConstants.Posts} element={<AuthenticationGuard component={Posts}/>}></Route>
        <Route path={PathConstants.Reception} element={<Reception></Reception>}></Route>
        <Route path={PathConstants.RSVP} element={<RSVP></RSVP>}></Route>
        <Route path={PathConstants.Home} element={<Home></Home>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
