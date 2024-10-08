import { useState } from 'react';
import { IWeddingAndSigner } from '../../API/GetRSVP';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectAuth } from '../../redux/selectors/selectAuth';
import { selectLanguage } from '../../redux/selectors/selectLanguage';
import { selectCeremony, selectReception, selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { getCeremony, getRSVPbyWeddingAndSigner, getReception } from '../../redux/slices/weddingSlice';


function AdminSideBar() {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState("visible")
    const wedding = useAppSelector(selectWedding)
    const ceremony = useAppSelector(selectCeremony)
    const reception = useAppSelector(selectReception)
    const auth = useAppSelector(selectAuth)
    const language = useAppSelector(selectLanguage).language;




    function setCeremonyEvent() {
        if(wedding != undefined)
            dispatch(getCeremony({weddingId: wedding.id.toString(), language: language}))
    }

    function setReceptionEvent() {
        if(wedding != undefined)
            dispatch(getReception({weddingId: wedding.id.toString(), language: language}))
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
          dispatch(getRSVPbyWeddingAndSigner( {signerId: auth.id, wedding_id: wedding.id.toString(), language: language} as IWeddingAndSigner))
    
      }

  return (
    <div id='adminSidebar' style={getVisibillity()}>
        <button onClick={setInvisible}>HideBar</button>
        {/* <button onClick={setWeddingEvent}>SetWedding</button> */}
        <label>Wedding: {wedding?.id}</label>
        <button onClick={setCeremonyEvent}>SetCeremony</button>
        <label>Ceremony: {ceremony?.id}</label>
        <label>User: {auth.user?.nickname}</label>
        <button onClick={setReceptionEvent}>SetReception</button>
        <label>Reception: {reception?.id}</label>
        <button onClick={printRSVP}>printRSVP</button>
        {/* <button onClick={setWeddingEvent}>SetWedding</button> */}
    </div>
    
  )
}


export default AdminSideBar