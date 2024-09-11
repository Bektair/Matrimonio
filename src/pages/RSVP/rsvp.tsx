import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IWeddingAndSigner } from '../../API/GetRSVP';
import CreateMenuOrderForm from '../../components/forms/createMenuOrderForm';
import List from '../../components/lists/genericlist';
import { IMenuOrder } from '../../models/IMenuOrder';
import { IRSVP, RSVPStatus } from '../../models/IRSVP';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectAuth } from '../../redux/selectors/selectAuth';
import { selectLanguage } from '../../redux/selectors/selectLanguage';
import { selectRSVPByAuthId, selectRSVPS, selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { IMenuOrderDelete, deleteMenuOrderThunk, getRSVPbyWeddingAndSigner, getReception } from '../../redux/slices/weddingSlice';
import RSVPAllreadyAccepted from './RSVPAllreadyAccepted';
import RSVPAllreadyAcceptedPastDue from './RSVPAllreadyAcceptedPastDue';
import RSVPDeclined from './RSVPDeclined';
import RSVPDeclinedPastDue from './RSVPDeclinedPastDue';
import RSVPDietaryMenu from './RSVPDietaryMenu';
import RSVPExpiredInvite from './RSVPExpiredInvite';
import RSVPPending from './RSVPPending';
import './rsvp.sass';
function Rsvp() {

  const { user, isAuthenticated } = useAuth0();
  const RSVPS = useAppSelector(selectRSVPS);
  const Wedding = useAppSelector(selectWedding);
  const language = useAppSelector(selectLanguage).language;
  const { dbId, id } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const currentRSVP = useAppSelector(state => selectRSVPByAuthId(state, dbId))
  const [currentMenuItem, setCurrentMenuItem] = useState();
  const [selectedMenuOrder, setSelectedMenuOrder] = useState<IMenuOrder>();
  const { t } = useTranslation();
  const [actualId] = useState(dbId ? dbId : id);


  const mode = import.meta.env.MODE;
  console.log("MODE")
  console.log(mode)

  useEffect(()=>{
    //TODO fjern, kun for testing
 
    console.log("ALL good")
    console.log(RSVPS)
    console.log(Wedding)
    console.log(currentRSVP)

    if(Wedding != undefined && !currentRSVP){
      dispatch(getRSVPbyWeddingAndSigner( {signerId: actualId, wedding_id: Wedding.id.toString(), language: language} as IWeddingAndSigner))
      dispatch(getReception({weddingId: Wedding.id.toString(), language: language}))
    }
    if(!isAuthenticated){
      console.log("not authenticated")
    }
    if(currentRSVP){
      console.log("ACTUALY?------------------------------ SEnt a currentrsvp dispatch?")
      console.log(currentRSVP)
      
      // dispatch(getMenuOrdersThunk(Number(currentRSVP.id)));
    }
  
  }, [currentRSVP?.menuOrders])


  // function updateRSVP(rsvp : IRSVPUpdate, id: string){Declined
  //   dispatch(updateRSVPThunk({ id: id, RSVP: rsvp }));
  // }
  

  function renderSwitchRSVPState(rsvp : IRSVP){
    var elements = [];
    console.log("ACTUALY?------------------------------ SEnt a currentrsvp dispatch?")
    console.log(currentRSVP)
    console.log("STATUS ER: " + rsvp.status)
    switch (rsvp.status) {
      case RSVPStatus.Pending:
        elements.push(<label>{rsvp.body}</label>)
        elements.push(<RSVPPending infoText={t("RSVPpending")} key={rsvp.id+"-"+rsvp.status} id={rsvp.id}></RSVPPending>)
        break;
      case RSVPStatus.Accepted:
        console.log("DEADLINE " + rsvp.deadline)
        if(rsvp.deadline > Date.now()){
          console.log("Klarte Deadline :)")
          elements.push(<RSVPAllreadyAccepted infoText={t("RSVPaccepted")} id={rsvp.id} key={rsvp.id+"-"+rsvp.status}></RSVPAllreadyAccepted>)
        } else {
          elements.push(<RSVPAllreadyAcceptedPastDue infoText={t("RSVPacceptedPastDue")} id={rsvp.id} key={rsvp.id+"-"+rsvp.status}></RSVPAllreadyAcceptedPastDue>)
        }
        break;
      case RSVPStatus.Declined:
        if(rsvp.deadline  > Date.now()){
          elements.push(<RSVPDeclined infoText={t("RSVPdeclined")} id={rsvp.id} key={rsvp.id+"-"+rsvp.status}></RSVPDeclined>)
        }
        else {
          elements.push(<RSVPDeclinedPastDue infoText={t("RSVPdeclinedPastDue")}  id={rsvp.id} key={rsvp.id+"-"+rsvp.status}></RSVPDeclinedPastDue>)
        }
        break;
      case RSVPStatus.PastDeadline:
        elements.push(<RSVPExpiredInvite infoText={t("RSVPexpiredInvite")} id={rsvp.id} key={rsvp.id+"-"+rsvp.status}></RSVPExpiredInvite>);
        break;
    
      default:
        elements.push(<div key={rsvp.id + "-wrong-status"}>{t("errorWrongStatus")}</div>)
        break;
    }
    return elements
  }



  function contentMenuOrders(e: IMenuOrder){
    var content = "";
    if(e.name) content += e.name + ","
    if(e.alergens && e.alergens.length > 0) content += e.alergens + ","
    if(e.menuOptionId) content += e.menuOptionId + ","
    console.log(e)
    console.log(content)
    return `${content.substring(0, content.length-1)}`
  }

  function setMenuItem(e: any){
    setCurrentMenuItem(e)
  }
  
  function selectMenuOrder(order : IMenuOrder){
    setSelectedMenuOrder(order);
  }

  function sendDeleteMenuOrder(){
    if(selectedMenuOrder != undefined && currentRSVP != undefined){
      var order : IMenuOrderDelete = {
        menuOrder_id: Number(selectedMenuOrder.id),
        rsvp_id: Number(currentRSVP?.id)
      }

      dispatch(deleteMenuOrderThunk(order))
    }
  }


  return (
    <>
      <h1>{t("hello")} {user?.name}!</h1> 
      <div className='RSVP-invite-button'>
        { actualId  && RSVPS && RSVPS.length > 0 && Wedding && currentRSVP &&
          <> 
            {renderSwitchRSVPState(currentRSVP)}
          </>
        }
      </div>

      { actualId && RSVPS && RSVPS.length > 0 && Wedding && currentRSVP && currentRSVP.status == RSVPStatus.Accepted &&
        <>
          <h2>{t("orderMenu")}</h2>
        <div className='DietaryMenu'>
          <RSVPDietaryMenu rsvp={currentRSVP} menuOrders={currentRSVP.menuOrders} setCurrentMenuItem={setMenuItem}></RSVPDietaryMenu>
          {currentMenuItem &&
            <CreateMenuOrderForm rsvp_id={currentRSVP.id} menuOptionId={currentMenuItem}></CreateMenuOrderForm>}
        </div>
          <h2>{t("currentOrders")}</h2>
        <div className='ordersList'>
          <List<IMenuOrder> name='menuOrders' listItems={currentRSVP.menuOrders} onclickEvent={(e)=> selectMenuOrder(e)} 
            setContentFunction={contentMenuOrders} ></List>
          <button type='button' onClick={sendDeleteMenuOrder}>{t("deleteOrder")}</button>
        </div>
        </>
      }
      
    </>

  )
}

export default Rsvp