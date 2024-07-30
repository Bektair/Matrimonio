import { useEffect, useState } from "react";
import Select from 'react-select';
import { IParticipantRequest } from "../../../API/CreateParticipant";
import UserList from "../../../components/lists/UserList";
import WeddingList from "../../../components/lists/WeddingList";
import List from "../../../components/lists/genericlist";
import { ParticipationRole } from "../../../constants/participantRoles";
import { IParticipant } from "../../../models/IParticipant";
import { IUser } from "../../../models/IUser";
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks/hooks";
import { selectUsers } from "../../../redux/selectors/selectUsers";
import { selectParticipants, selectWedding } from "../../../redux/selectors/selectWeddingSlice";
import { selectWeddings } from "../../../redux/selectors/selectWeddingsSlice";
import { getAllUsers } from "../../../redux/slices/usersSlice";
import { addParticipantThunk, getParticipantsThunk } from "../../../redux/slices/weddingSlice";
import { getAllWeddings } from "../../../redux/slices/weddingsSlice";
import { selectLanguage } from "../../../redux/selectors/selectLanguage";


function ParticipationMenu() {
    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();
    const weddings = useAppSelector(selectWeddings);
    const wedding = useAppSelector(selectWedding);
    const language = useAppSelector(selectLanguage).language;
    const participants = useAppSelector(selectParticipants);
    const [selectedUser, setSelectedUser] = useState<IUser>()
    const roles = Object.values(ParticipationRole).map((x)=>{return { value: x.toString(), label: x.toString()}});
    const [role, setRole] = useState<string | undefined>("");


    useEffect(()=> {
        setTimeout(function() {dispatch(getAllUsers());}, 500)
        setTimeout(function() {dispatch(getAllWeddings(language));}, 10)

        console.log("TRYING TO RENDER BOYS!!!!!!!!!!!!")
        console.log(wedding)
        if(wedding){

            dispatch(getParticipantsThunk({weddingId: wedding.id.toString(), language: language}))
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
                userId: selectedUser.id.trim(),
                weddingId: wedding.id.toString(),
                language: language,
                isDefaultLanguage: (wedding.defaultLanguage.toUpperCase() == language.toUpperCase())  
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