
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Home} from './pages/Home/home'
import Login from './pages/Auth/login'
import {Register} from './pages/Auth/register'
import { Auth0Provider } from "@auth0/auth0-react";
import { audience, clientId, domain, redirectUri } from './constants/environment.ts';
import Layout from './components/Layout/Layout.tsx'
import PathConstants from './components/route/pathConstants.tsx'
import Ceremony from './pages/Schedule/Ceremony/Ceremony.tsx'
import Rsvp from './pages/RSVP/Rsvp.tsx'
import Reception from './pages/Schedule/Reception/Reception.tsx'
import Profile from './pages/Profile/Profile.tsx'
import Create from './pages/Create/create.tsx'
import Weddingsmenu from './pages/AdminConsole/WeddingsMenu/Weddingsmenu.tsx'
import Posts from './pages/Posts/Posts.tsx'
import Schedule from './pages/Schedule/Schedule.tsx'
import AdminConsole from './pages/AdminConsole/AdminConsole.tsx'
import UserCreationMenu from './pages/AdminConsole/UserCreationMenu/UserCreationMenu.tsx'

export const App : React.FC = () => {

  return (
    <BrowserRouter>
        <Auth0Provider
              domain={domain}
              clientId={clientId}
              authorizationParams={{
                audience: audience,
                redirect_uri: redirectUri,
              }

            }
            >
        <Routes>
          <Route element={<Layout/>}> 
            <Route path={PathConstants.Home} element={<Home/>} />
            <Route path={PathConstants.Login} element={<Login/>} />
            <Route path={PathConstants.Register} element={<Register/>} />
            <Route path={PathConstants.Ceremony} element={<Ceremony/>} />
            <Route path={PathConstants.RSVP} element={<Rsvp/>} />
            <Route path={PathConstants.Reception} element={<Reception/>} />
            <Route path={PathConstants.Schedule} element={<Schedule/>} />
            <Route path={PathConstants.Profile} element={<Profile/>} />
            <Route path={PathConstants.Create} element={<Create/>} />
            <Route path={PathConstants.Posts} element={<Posts/>} />
            <Route path={PathConstants.Admin} element={<AdminConsole/>} />
            <Route path={PathConstants.WeddingMenu} element={<Weddingsmenu/>} />
            <Route path={PathConstants.User} element={<UserCreationMenu/>} />

          </Route>

        </Routes>
        </Auth0Provider>
      </BrowserRouter>
      



  )
}

export default App
