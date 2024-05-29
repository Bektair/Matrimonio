import { useRef, useState } from 'react';
import { IPasswordresetRequest, IUserCreateRequest, createUser, getResetPasswordLink } from '../../../API/ManagementAPI/CreateUser';
import { app_name } from '../../../constants/environment';

  


  const UserRequest : IUserCreateRequest = {
    "email": "user@example.com",
    "user_metadata": {},
    "blocked": false,
    "email_verified": false,
    "app_metadata": {},
    "given_name": "stri",
    "family_name": "strin",
    "name": "Testyman",
    "nickname": "mantest",
    "picture": "https://no.wikipedia.org/wiki/Fil:Male_gorilla_in_SF_zoo.jpg",
    "user_id": "user_",
    "connection": "Username-Password-Authentication",
    "password": "1001Spill+",
    "verify_email": false
  }

  
  
  
  const PasswordRequest : IPasswordresetRequest = {    
    "client_id": "rR1Zasflke8YOOOqGbev1r9uvUnfXezN",
    "connection_id": "con_jp3ccNCoRLHsArBr",
    "email": "oyvind.reitan3@gmail.com",
    "ttl_sec": 0,
    "mark_email_as_verified": true,
    "includeEmailInRedirect": true
  }



function UserCreationMenu() {
  const emailRef = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const [passwordLink, setPasswordLink] = useState("")
  const [inviteLink, setInviteLink] = useState("")

  async function sendRequest(event: any){
    if(emailRef.current!=null && name.current !=null) {
      UserRequest.email = emailRef.current.value;
      UserRequest.name = name.current.value;
      UserRequest.user_id += name.current.value
    }
    var test = await createUser(UserRequest);
    console.log(test);
    console.log(event.target.value)
  }

  async function setPasswordRequest (event: any)  {
    if(emailRef.current!=null)
      PasswordRequest.email = emailRef.current?.value;
    console.log("pw reset request sent" + event.target.value)
    var passwordLinkTemp = await getResetPasswordLink(PasswordRequest);
    var regex = /https.*#/;
    var link = passwordLinkTemp.match(regex);
    if(link!=null)  
      setPasswordLink(link[0]);
  }

  async function sendPasswordRequest(event: any){


  } 

  
  async function sendInviteRequest(event: any){
    var inviteLink = passwordLink +"type=invite#app="+app_name
    setInviteLink(inviteLink);

  } 


  return (
    <>
        <h1>userCreationMenu</h1>
        <button onClick={sendRequest}>createUser</button>
        <input type='text' ref={emailRef} placeholder='email@email.com'></input>
        <input type='text' ref={name} placeholder='John Smith'></input>
        <button onClick={setPasswordRequest}>setPasswordRequest</button>
        <div>PWLink: {passwordLink}</div>
        <button onClick={sendInviteRequest}>sendInviteRequest</button>
        <button onClick={sendPasswordRequest}>sendPasswordRequest</button>
        <div>Invite Link:</div>
        <div>{inviteLink}</div>

    </>
  )
}

export default UserCreationMenu