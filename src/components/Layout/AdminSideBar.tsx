import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { getAWedding, getCeremony, getReception, selectCeremony, selectReception, selectWedding, setWedding } from '../../redux/slices/weddingSlice';
import { getAllWeddings, selectWeddings } from '../../redux/slices/weddingsSlice';
import { selectAuth } from '../../redux/slices/authSlice';


function AdminSideBar() {
    const weddings = useAppSelector(selectWeddings)
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState("visible")
    const wedding = useAppSelector(selectWedding)
    const ceremony = useAppSelector(selectCeremony)
    const reception = useAppSelector(selectReception)
    const user = useAppSelector(selectAuth).user

    useEffect(()=>{
        if(weddings.length > 0)
            dispatch(setWedding(weddings[0]));
        else{
            dispatch(getAllWeddings());
        }


    }, [])


    function setWeddingEvent() {
        if(weddings.length > 0)
            dispatch(setWedding(weddings[0]));
        else{
            dispatch(getAllWeddings());
        }
    }

    function setCeremonyEvent() {
        console.log(user)
        if(wedding != undefined)
            dispatch(getCeremony(wedding.id))
    }

    function setReceptionEvent() {
        console.log(user)
        if(wedding != undefined)
            dispatch(getReception(wedding.id))
    }


    function getVisibillity(){
        return  Object.assign({
            visibility: visible            
        })
    }

    function setInvisible(){
        setVisible("hidden")
        console.log(visible)
    }



  return (
    <div id='adminSidebar' style={getVisibillity()}>
        <button onClick={setInvisible}>HideBar</button>
        <button onClick={setWeddingEvent}>SetWedding</button>
        <label>Wedding: {wedding?.id}</label>
        <button onClick={setCeremonyEvent}>SetCeremony</button>
        <label>Ceremony: {ceremony?.id}</label>
        <label>User: {user?.nickname}</label>
        <button onClick={setReceptionEvent}>SetReception</button>
        <label>Reception: {reception?.id}</label>
        <button onClick={setWeddingEvent}>SetWedding</button>
        <button onClick={setWeddingEvent}>SetWedding</button>
    </div>
    
  )
}


export default AdminSideBar