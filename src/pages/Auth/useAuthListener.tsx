import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAuthState } from "../../redux/slices/authSlice"
import Cookies from 'js-cookie';



function useAuthListener() {
  const {isAuthenticated, user, isLoading, getAccessTokenSilently} = useAuth0()
  const dispatch = useDispatch()

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
    } else {
      var id = user?.sub?.split("|")[1];
      dispatch(setAuthState({isAuthenticated, user, isLoading, id}))
    }



  }, [dispatch, isAuthenticated, user, isLoading, getAccessTokenSilently])

  return {isLoading, isAuthenticated}

}

export default useAuthListener