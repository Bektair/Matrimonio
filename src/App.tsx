
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
import PostMenu from './pages/AdminConsole/PostMenu/PostMenu.tsx'
import PostDetails from './pages/Posts/postDetails.tsx'
import Authorize from './pages/Auth/authorize.tsx'

export const App : React.FC = () => {
  

  
  const auth =  useAuthListener()
  

  return (
        <Routes>
          <Route element={<Layout/>}> 
            <Route path={PathConstants.Home} element={<ProtectedRoute auth={auth}><Home/></ProtectedRoute>} />
            <Route path={PathConstants.Authorize} element={<Authorize/>} />
            <Route path={PathConstants.Login} element={<ProtectedRoute auth={auth}><Login/></ProtectedRoute>} />
            <Route path={PathConstants.Register} element={<ProtectedRoute auth={auth}><Register/></ProtectedRoute>} />
            <Route path={PathConstants.Ceremony} element={<ProtectedRoute auth={auth}><Ceremony/></ProtectedRoute>} />
            <Route path={PathConstants.CeremonyMenu} element={<ProtectedAdminRoute auth={auth}><CeremonyMenu/></ProtectedAdminRoute>} />
            <Route path={PathConstants.RSVP} element={<ProtectedRoute auth={auth}><Rsvp/></ProtectedRoute>} />
            <Route path={PathConstants.Reception} element={<ProtectedRoute auth={auth}><Reception/></ProtectedRoute>} />
            <Route path={PathConstants.ReceptionMenu} element={<ProtectedAdminRoute auth={auth}><ReceptionMenu/></ProtectedAdminRoute>} />
            <Route path={PathConstants.Schedule} element={<ProtectedRoute auth={auth}><Schedule/></ProtectedRoute>} />
            <Route path={PathConstants.Profile} element={<ProtectedRoute auth={auth}><Profile/></ProtectedRoute>} />
            <Route path={PathConstants.Create} element={<ProtectedRoute auth={auth}><Create/></ProtectedRoute>} />
            <Route path={PathConstants.Posts} element={<ProtectedRoute auth={auth}><Posts/></ProtectedRoute>} />
            <Route path={PathConstants.PostsDetails+"/:id"} element={<ProtectedRoute auth={auth}><PostDetails/></ProtectedRoute>} />
            <Route path={PathConstants.Admin} element={<ProtectedAdminRoute auth={auth}><AdminConsole/></ProtectedAdminRoute>} />
            <Route path={PathConstants.WeddingMenu} element={<ProtectedAdminRoute auth={auth}><Weddingsmenu/></ProtectedAdminRoute>} />
            <Route path={PathConstants.RSVPMenu} element={<ProtectedAdminRoute auth={auth}><RsvpMenu/></ProtectedAdminRoute>} />
            <Route path={PathConstants.User} element={<ProtectedAdminRoute auth={auth}><UserCreationMenu/></ProtectedAdminRoute>} />
            <Route path={PathConstants.ParticipationMenu} element={<ProtectedAdminRoute auth={auth}><ParticipationMenu/></ProtectedAdminRoute>} />
            <Route path={PathConstants.PostMenu} element={<ProtectedAdminRoute auth={auth}><PostMenu/></ProtectedAdminRoute>} />
          </Route>
        </Routes>
  )
}

export default App
