import { useEffect, useRef, useState } from 'react';
import { IPasswordresetRequest, IUserCreateRequest, createUser, getResetPasswordLink } from '../../../API/ManagementAPI/CreateUser';
import CreateRsvpForm from '../../../components/forms/createRsvpForm';
import List from '../../../components/lists/genericlist';
import { app_name } from '../../../constants/environment';
import { IUser } from '../../../models/IUser';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks/hooks';
import { getAllUsers } from '../../../redux/slices/usersSlice';
import { getCeremony } from '../../../redux/slices/weddingSlice';
import './UserCreationMenu.sass';
import { selectUsers } from '../../../redux/selectors/selectUsers';
import { selectWedding } from '../../../redux/selectors/selectWeddingSlice';



  const UserRequest : IUserCreateRequest = {
    "email": "user@example.com",
    "user_metadata": {},
    "blocked": false,
    "email_verified": false,
    "app_metadata": {},
    "given_name": "string",
    "family_name": "string",
    "name": "Testyman",
    "nickname": "mantest",
    "picture": "https://no.wikipedia.org/wiki/Fil:Male_gorilla_in_SF_zoo.jpg",
    "user_id": "user_",
    "connection": "MatrimonioPostgres",
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
  const password = useRef<HTMLInputElement>(null);
  const [passwordLink, setPasswordLink] = useState("")
  const [inviteLink, setInviteLink] = useState("")
  const dispatch = useAppDispatch();
  let users = useAppSelector(selectUsers);
  const [selectedUser, setSelectedUser] = useState<IUser>()
  const wedding = useAppSelector(selectWedding);

  useEffect(()=> {
    setTimeout(function() {dispatch(getAllUsers());}, 500)
    if(wedding!=undefined)
      dispatch(getCeremony(wedding.id))




 }, [])

  async function sendRequest(event: any){
    if(emailRef.current!=null && name.current !=null) {
      UserRequest.email = emailRef.current.value;
      UserRequest.name = name.current.value;
      UserRequest.password = password.current?.value ?? "test";
      UserRequest.user_id += name.current.value
    }
    var test = await createUser(UserRequest);
    console.log(test);
    console.log(event.target.value)
  }

  async function setPasswordRequest ()  {
    if(selectedUser!=null)
      PasswordRequest.email = selectedUser.email;
    
    var passwordLinkTemp = await getResetPasswordLink(PasswordRequest);
    var regex = /https.*#/;
    var link = passwordLinkTemp.match(regex);
    if(link!=null)  
      setPasswordLink(link[0]);
  }
  
  
  async function sendInviteRequest(){
    var inviteLink = passwordLink +"type=invite#app="+app_name
    setInviteLink(inviteLink);

  } 

  async function selectUserClick(selectedItem : IUser) {
    
    setSelectedUser(selectedItem);

  }

  function getContent(_user : IUser){
    var content = "";
    content += `${_user.firstName} ${_user.lastName} ${_user.email}`;
    return content
}


  return (
    <>
      <h1>userCreationMenu</h1>
      <div id='userCreationMenu'>
          <input type='text' ref={emailRef} placeholder='email@email.com'></input>
          <input type='text' ref={name} placeholder='John Smith'></input>
          <input type='text' ref={password} placeholder='password' defaultValue={"test"}></input>
          <button onClick={sendRequest}>createUser</button>
      </div>
      <div id='userSelectionMenu'>
        {users.length > 0 && <List name='users' listItems={users} setContentFunction={getContent} onclickEvent={selectUserClick}></List>  }
      </div>
      <label>{selectedUser?.id}</label>

      <div id='passwordAndInviteLinks'>
        <div id='passwordlinks'>
          <button onClick={setPasswordRequest}>PasswordRequest</button>
          <div>{passwordLink}</div>
        </div>
        <div id='invitelinks'>
          <button onClick={sendInviteRequest}>InviteRequest</button>
          <div>{inviteLink}</div>
        </div>
      </div>
      { selectedUser &&
      <CreateRsvpForm user={selectedUser} wedding={wedding}></CreateRsvpForm>}
    </>
  )
}

export default UserCreationMenu