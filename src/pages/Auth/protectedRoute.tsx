import { Navigate } from 'react-router-dom'

function ProtectedRoute({children, auth} : any) {
    const {isAuthenticated, isLoading} = auth

    if(isLoading) return <div>Loading...</div>
    if(isAuthenticated) return children

  return (
    <Navigate to="/authorize"></Navigate>
  )
}

export default ProtectedRoute