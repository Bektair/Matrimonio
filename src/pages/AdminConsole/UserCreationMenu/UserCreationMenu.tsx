import { IUserCreateRequest, createUser } from '../../../../marry_monio_frontend/src/API/ManagementAPI/CreateUser';




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
    "user_id": "IamAmazing",
    "connection": "Username-Password-Authentication",
    "password": "1001Spill+",
    "verify_email": false
  }


  async function sendRequest(event: any){
    var test = await createUser(UserRequest);
    console.log(test);
    console.log(event.target.value)
  }

function UserCreationMenu() {
  return (
    <>
        <h1>userCreationMenu</h1>
        <button onClick={sendRequest}>createUser</button>

    </>
  )
}

export default UserCreationMenu