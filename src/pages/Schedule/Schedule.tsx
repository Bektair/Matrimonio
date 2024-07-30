import { useEffect, useState } from 'react';
import { clientId, domain, redirectUri } from '../../constants/environment';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectCeremony, selectReception, selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { getCeremony, getReception } from '../../redux/slices/weddingSlice';
import "./Schedule.sass";
import Summary from './Summary';
import { Link } from 'react-router-dom';
import PathConstants from '../../components/route/pathConstants';
import { selectLanguage } from '../../redux/selectors/selectLanguage';

function Schedule() {

  console.log("REDIREKT" + redirectUri);
  console.log("cleintId" + clientId);
  console.log("domain" + domain);
  //I Need to get the reception :)
  const currentReception = useAppSelector(selectReception)
  const currentCeremony = useAppSelector(selectCeremony)
  const wedding = useAppSelector(selectWedding)
  const language = useAppSelector(selectLanguage).language

  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("Ceremony");


  useEffect(()=>{

    console.log("Loading SchedulePage")
    console.log(wedding)
    console.log(currentReception)
    if(!currentReception && wedding){
      dispatch(getReception({weddingId: wedding.id.toString(), language: language}))
    }
    if(!currentCeremony && wedding){
      dispatch(getCeremony({weddingId: wedding.id.toString(), language: language }))
    }

  }, [])

  


  return (
    <>
      <div className='schedule-tabs'>
        <label className={`schedule-tab ${activeTab == "Ceremony" ? "schedule-tab-selected" : "schedule-tab-not-selected"}`}>Ceremony<input type='radio' onClick={() => setActiveTab("Ceremony")} name='scheduleEvents' defaultChecked={true}/></label>
        <label className={`schedule-tab ${activeTab == "Reception" ? "schedule-tab-selected" : "schedule-tab-not-selected"}`}>Reception<input  type='radio' onClick={() => setActiveTab("Reception")} name='scheduleEvents'/></label>
      </div>
      <div className='schedule-background'>
        { currentReception && activeTab=="Reception" &&
          <>
            <Summary location={currentReception.location} startDate={currentReception.startDate} endDate={currentReception.endDate}></Summary>
            <label className="nav-item">For more info <Link to={PathConstants.Reception}>Reception</Link></label>
          </>
        }
        { currentCeremony && activeTab=="Ceremony" &&
          <>
            <Summary location={currentCeremony.location} startDate={currentCeremony.startDate} endDate={currentCeremony.endDate}></Summary> 
            <label className="nav-item">For more info <Link to={PathConstants.Ceremony}>Ceremony</Link></label>
          </>
        }
      </div>
      
    </>
  )
}

export default Schedule