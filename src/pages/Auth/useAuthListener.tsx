import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAuthState } from "../../redux/slices/authSlice"
import Cookies from 'js-cookie';



function useAuthListener() {
  const {isAuthenticated, user, isLoading, getAccessTokenSilently} = useAuth0()
  const dispatch = useDispatch()
  var isAdmin = false; 
  useEffect(()=>{

    const getToken = (async () => {
      
      var id = user?.sub?.split("|")[1];
      console.log("postingToken" + id)
      var token = await getAccessTokenSilently()
      Cookies.set('token', token, { expires: 7, secure: true})
      dispatch(setAuthState({isAuthenticated, user, isLoading, id}))

      return token;
    })

    if(isAuthenticated){
      console.log("allreadyAuthenticated")
      getToken();
      if(user){
        var roles = user['https://marrymonio.azurewebsites.net/roles']
        console.log("ROLLER SOM ER FUNNET I AUTHLISTENER")
        console.log(roles)
        if(roles && roles.length > 0){
          if(roles.find((x : string)=> x == "Administrator"))
            isAdmin= true;
        }
      }
      console.log("IsAdmin?")
      console.log(isAdmin)


    } else {
      var id = user?.sub?.split("|")[1];
      dispatch(setAuthState({isAuthenticated, user, isLoading, id}))
    }
    



  }, [dispatch, isAuthenticated, user, isLoading, getAccessTokenSilently])

  return {isLoading, isAuthenticated, isAdmin}

}

export default useAuthListener