import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/Hooks/hooks';
import { selectAuth } from '../../redux/selectors/selectAuth';


function ProtectedAdminRoute({children, auth} : any) {
    const {isAuthenticated, isLoading} = auth
    const auth2 = useAppSelector(selectAuth)

    console.log("ISADMIN WRAPPER TRIGGERED")
    console.log(isAuthenticated)
    console.log(auth2.isAdmin)
    if(isLoading) return <div>Loading...</div>
    if(isAuthenticated && auth2.isAdmin) return children

  return (
    <Navigate to="/"></Navigate>
  )
}

export default ProtectedAdminRoute