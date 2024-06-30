import { Navigate } from 'react-router-dom'

function ProtectedAdminRoute({children, auth} : any) {
    const {isAuthenticated, isLoading, isAdmin} = auth

    console.log("ISADMIN WRAPPER TRIGGERED")
    console.log(isAuthenticated)
    console.log(isAdmin)
    if(isLoading) return <div>Loading...</div>
    if(isAuthenticated && isAdmin) return children

  return (
    <Navigate to="/"></Navigate>
  )
}

export default ProtectedAdminRoute