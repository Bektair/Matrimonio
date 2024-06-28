import { IUser } from '../../models/IUser';
import List from './genericlist';


interface IProps {
    users: IUser[]
    setSelectedUser : any
}

function UserList(props: IProps) {
    async function selectUserClick(selectedItem : IUser) {
        props.setSelectedUser(selectedItem);
    }

    function getContent(_user : IUser){
        var content = "";
        content += `${_user.firstName} ${_user.lastName} ${_user.email}`;
        return content
    }

    
  return (
    <>
        <div>UserList</div>
        {props.users.length > 0 && <List name='users' listItems={props.users} setContentFunction={getContent} onclickEvent={selectUserClick}></List>  }
    </>
  )
}

export default UserList