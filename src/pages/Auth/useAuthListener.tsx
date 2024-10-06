import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { IUserRequest } from "../../API/CreateUser";
import { createUserThunk, getUserByEmailThunk, setAuthState } from "../../redux/slices/authSlice";

import Cookies from 'js-cookie';
import { useAppDispatch } from "../../redux/Hooks/hooks";



function useAuthListener() {
  const {isAuthenticated, user, isLoading, getAccessTokenSilently} = useAuth0()
  const dispatch = useAppDispatch()

  var isAdmin = false; 
  var isSocial = false;
  useEffect(()=>{
    if(!user?.sub?.match("auth0")) isSocial = true

    const getToken = (async () => {
      
      var id = user?.sub?.split("|")[1];
      console.log("postingToken" + id)
      var token = await getAccessTokenSilently()
      Cookies.set('token', token, { expires: 7, secure: true})
      dispatch(setAuthState({isAuthenticated, user, isLoading, id, isAdmin, dbId: "", profilePic:"", isSocial}))
      console.log("----------------------------------UserListener")
      console.log(user)
      dispatch(getUserByEmailThunk());

      if(user && id && user.email && user.email_verified){
        var userReq : IUserRequest = { Id: id, FirstName: user.name, LastName: user.given_name, ProfilePicture: user.picture, 
          Email: user.email, Nickname: user.nickname, Email_Verified: user.email_verified
        }
        if(userReq)
          dispatch(createUserThunk(userReq))
      }
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
      dispatch(setAuthState({isAuthenticated, user, isLoading, id, isAdmin, dbId: "", profilePic:"", isSocial}))
      
    }
    



  }, [dispatch, isAuthenticated, user, isLoading, getAccessTokenSilently])

  return {isLoading, isAuthenticated, isAdmin}

}

export default useAuthListener