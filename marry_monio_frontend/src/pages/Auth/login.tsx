import { useKeycloak } from '@react-keycloak/web';
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import keycloak from '../../../keycloak';


function Login() {



  useEffect(()=>{


    const login = async () => {
     await keycloak.login()
    }

    if(!keycloak.authenticated){
      login()
      .catch(console.error)
    }
  }, [])


  return <div>login</div>
  
}

export default Login