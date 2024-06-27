import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { IWeddingAndSigner, getCeremony, getRSVPbyWeddingAndSigner, getReception, setWedding } from '../../redux/slices/weddingSlice';
import { getAllWeddings,  } from '../../redux/slices/weddingsSlice';
import { selectWeddings } from '../../redux/selectors/selectWeddingsSlice';
import { selectCeremony, selectReception, selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { selectAuth } from '../../redux/selectors/selectAuth';


function AdminSideBar() {
    const weddings = useAppSelector(selectWeddings)
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState("visible")
    const wedding = useAppSelector(selectWedding)
    const ceremony = useAppSelector(selectCeremony)
    const reception = useAppSelector(selectReception)
    const auth = useAppSelector(selectAuth)

    useEffect(()=>{
        if(weddings.length > 0)
            dispatch(setWedding({wedding: weddings[0]}));
        else{
            dispatch(getAllWeddings());
        }


    }, [])


    function setWeddingEvent() {
        if(weddings.length > 0)
            dispatch(setWedding({
                wedding: weddings[0], 
            }));
        else{
            dispatch(getAllWeddings());
        }
    }

    function setCeremonyEvent() {
        if(wedding != undefined)
            dispatch(getCeremony(wedding.id))
    }

    function setReceptionEvent() {
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


    function printRSVP(){

        if(wedding != undefined)
          dispatch(getRSVPbyWeddingAndSigner( {signerId: auth.id, wedding_id: wedding.id.toString()} as IWeddingAndSigner))
    
      }

  return (
    <div id='adminSidebar' style={getVisibillity()}>
        <button onClick={setInvisible}>HideBar</button>
        <button onClick={setWeddingEvent}>SetWedding</button>
        <label>Wedding: {wedding?.id}</label>
        <button onClick={setCeremonyEvent}>SetCeremony</button>
        <label>Ceremony: {ceremony?.id}</label>
        <label>User: {auth.user?.nickname}</label>
        <button onClick={setReceptionEvent}>SetReception</button>
        <label>Reception: {reception?.id}</label>
        <button onClick={printRSVP}>printRSVP</button>
        <button onClick={setWeddingEvent}>SetWedding</button>
    </div>
    
  )
}


export default AdminSideBar