import React from "react"
import PathConstants from "./pathConstants"

const Home = React.lazy(() => import("../../pages/Home/home"))
const Login = React.lazy(() => import("../../pages/Auth/login"))
const Ceremony = React.lazy(() => import("../../pages/Ceremony/ceremony"))
const Posts = React.lazy(() => import("../../pages/Posts/posts"))
const Reception = React.lazy(() => import("../../pages/Reception/reception"))
const RSVP = React.lazy(() => import("../../pages/RSVP/rsvp"))
const Register = React.lazy(() => import("../../pages/Auth/register"))

const routes = [
    { path: PathConstants.Login, element: <Login /> },
    { path: PathConstants.Register, element: <Register /> },
    { path: PathConstants.Home, element: <Home /> },
    { path: PathConstants.Ceremony, element: <Ceremony /> },
    { path: PathConstants.Posts, element: <Posts /> },
    { path: PathConstants.Reception, element: <Reception /> },
    { path: PathConstants.RSVP, element: <RSVP /> },
]

export default routes;