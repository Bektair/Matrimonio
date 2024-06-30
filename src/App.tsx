
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout.tsx'
import PathConstants from './components/route/pathConstants.tsx'
import AdminConsole from './pages/AdminConsole/AdminConsole.tsx'
import CeremonyMenu from './pages/AdminConsole/CeremonyMenu/CeremonyMenu.tsx'
import ParticipationMenu from './pages/AdminConsole/ParticipationMenu/ParticipationMenu.tsx'
import RsvpMenu from './pages/AdminConsole/RSVPMenu/rsvpMenu.tsx'
import ReceptionMenu from './pages/AdminConsole/ReceptionMenu/ReceptionMenu.tsx'
import UserCreationMenu from './pages/AdminConsole/UserCreationMenu/UserCreationMenu.tsx'
import Weddingsmenu from './pages/AdminConsole/WeddingsMenu/Weddingsmenu.tsx'
import Login from './pages/Auth/login'
import ProtectedAdminRoute from './pages/Auth/protectedAdminRoute.tsx'
import ProtectedRoute from './pages/Auth/protectedRoute.tsx'
import { Register } from './pages/Auth/register'
import useAuthListener from './pages/Auth/useAuthListener.tsx'
import Create from './pages/Create/create.tsx'
import { Home } from './pages/Home/home'
import Posts from './pages/Posts/posts.tsx'
import Profile from './pages/Profile/Profile.tsx'
import Rsvp from './pages/RSVP/rsvp.tsx'
import Ceremony from './pages/Schedule/Ceremony/Ceremony.tsx'
import Reception from './pages/Schedule/Reception/Reception.tsx'
import Schedule from './pages/Schedule/Schedule.tsx'

export const App : React.FC = () => {
  

  
  const auth =  useAuthListener()
  

  return (
        <Routes>
          <Route element={<Layout/>}> 
            <Route path={PathConstants.Home} element={<Home/>} />
            <Route path={PathConstants.Login} element={<Login/>} />
            <Route path={PathConstants.Register} element={<Register/>} />
            <Route path={PathConstants.Ceremony} element={<Ceremony/>} />
            <Route path={PathConstants.CeremonyMenu} element={<ProtectedAdminRoute auth={auth}><CeremonyMenu/></ProtectedAdminRoute>} />
            <Route path={PathConstants.RSVP} element={<ProtectedRoute auth={auth}><Rsvp/></ProtectedRoute>} />
            <Route path={PathConstants.Reception} element={<Reception/>} />
            <Route path={PathConstants.ReceptionMenu} element={<ProtectedAdminRoute auth={auth}><ReceptionMenu/></ProtectedAdminRoute>} />
            <Route path={PathConstants.Schedule} element={<Schedule/>} />
            <Route path={PathConstants.Profile} element={<Profile/>} />
            <Route path={PathConstants.Create} element={<Create/>} />
            <Route path={PathConstants.Posts} element={<Posts/>} />
            <Route path={PathConstants.Admin} element={<ProtectedAdminRoute auth={auth}><AdminConsole/></ProtectedAdminRoute>} />
            <Route path={PathConstants.WeddingMenu} element={<ProtectedAdminRoute auth={auth}><Weddingsmenu/></ProtectedAdminRoute>} />
            <Route path={PathConstants.RSVPMenu} element={<ProtectedAdminRoute auth={auth}><RsvpMenu/></ProtectedAdminRoute>} />
            <Route path={PathConstants.User} element={<ProtectedAdminRoute auth={auth}><UserCreationMenu/></ProtectedAdminRoute>} />
            <Route path={PathConstants.ParticipationMenu} element={<ProtectedAdminRoute auth={auth}><ParticipationMenu/></ProtectedAdminRoute>} />
          </Route>
        </Routes>
  )
}

export default App
