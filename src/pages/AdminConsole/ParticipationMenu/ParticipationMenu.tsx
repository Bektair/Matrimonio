import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks/hooks";
import { selectUsers } from "../../../redux/selectors/selectUsers";
import { getAllUsers } from "../../../redux/slices/usersSlice";
import { getAllWeddings } from "../../../redux/slices/weddingsSlice";
import { selectWeddings, selectWeddingsByParticipant } from "../../../redux/selectors/selectWeddingsSlice";
import WeddingList from "../../../components/lists/WeddingList";
import UserList from "../../../components/lists/UserList";
import { IUser } from "../../../models/IUser";
import { selectParticipants, selectWedding } from "../../../redux/selectors/selectWeddingSlice";
import { ParticipationRole } from "../../../constants/participantRoles";
import Select from 'react-select';
import { SelectValue } from "../../../components/forms/createMenuItemForm";
import { addParticipantThunk, getParticipantsThunk } from "../../../redux/slices/weddingSlice";
import { IParticipantRequest } from "../../../API/CreateParticipant";
import List from "../../../components/lists/genericlist";
import { IParticipant } from "../../../models/IParticipant";


function ParticipationMenu() {
    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();
    const weddings = useAppSelector(selectWeddings);
    const wedding = useAppSelector(selectWedding);
    const participants = useAppSelector(selectParticipants);
    const [selectedUser, setSelectedUser] = useState<IUser>()
    const roles = Object.values(ParticipationRole).map((x)=>{return { value: x.toString(), label: x.toString()}});
    const [role, setRole] = useState<string | undefined>("");


    useEffect(()=> {
        setTimeout(function() {dispatch(getAllUsers());}, 500)
        setTimeout(function() {dispatch(getAllWeddings());}, 10)

        console.log("TRYING TO RENDER BOYS!!!!!!!!!!!!")
        console.log(wedding)
        if(wedding){

            dispatch(getParticipantsThunk({weddingId: wedding.id.toString()}))
        }
    
    
    
     }, [wedding])
    
     async function selectUserClick(selectedItem : IUser) {
    
        setSelectedUser(selectedItem);
    
      }

      function AddParticipant(){
        console.log(role)
        console.log(wedding)
        console.log(selectedUser)

        if(role && wedding && selectedUser){
            var participantReq : IParticipantRequest = {
                role: role,
                userId: selectedUser.id,
                wedding_id: wedding.id.toString()
            }

            if(participantReq){
                dispatch(addParticipantThunk(participantReq))
                
            }



        }
      }

      function onClickParticipant(e : IParticipant){
        console.log(e)
      }

      function setContentParticipant(e: IParticipant){
        var user = users.find((user) => user.id == e.id)
        return `${user?.nickname}, ${user?.firstName} ${user?.lastName}, ${e.role}`
      }
    

  return (
    <>
        <div>ParticipationMenu</div>
        <WeddingList weddings={weddings}></WeddingList>
        <label>{wedding?.title}</label>
        <UserList setSelectedUser={selectUserClick} users={users}></UserList>
        <label>{selectedUser?.nickname}</label>
        <Select 
                name="wedding-roles"
                options={roles}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(x) => setRole(x?.value)}
                placeholder='Select Roles'
            />
        <button onClick={AddParticipant}>AddParticipant</button>
        <List listItems={participants} name="participants" onclickEvent={onClickParticipant} setContentFunction={setContentParticipant}></List>

    </>

  )
}

export default ParticipationMenu