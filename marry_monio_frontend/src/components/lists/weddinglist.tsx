import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IWedding } from '../../models/IWedding';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { setWedding } from '../../redux/slices/weddingSlice';
import { selectWeddings } from '../../redux/slices/weddingsSlice';
import PathConstants from '../route/pathConstants';
import './weddinglist.sass';



function Weddinglist()  {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  let weddings = useAppSelector(selectWeddings);
  const [pagesize] = useState(10)
  
  const [currentPage, setCurrentPage] = useState(0)

  
  function onWeddingClick(event : any) {
    var id = event?.target.id;
    id = id.split("-")[1] //Skal bare ha id biten, ikke det før -
    console.log(weddings)
    console.log(id)
    let selectedWedding = weddings.filter(wedding => wedding.id == id)[0]
    if(selectedWedding != undefined){
        navigate("../" + PathConstants.Home)
        dispatch(setWedding(selectedWedding)); //I want to select from the dict of all weddings the one with correct id
    }else{
        console.log("failure to select wedding")
    }
  }

  const Wedding = ({ value } : any) => {
    const {description, id, dresscode} = value
    return <li className='wedding-list-item' key={id} id={`wedding-${id}`} onClick={onWeddingClick}>{dresscode} {description} {id}</li>
  }

  function renderWeddings(){
    var elements : JSX.Element[] = [];
    var count = 0;
    if(weddings.length > 0){
      var page = weddings.slice(currentPage*pagesize, (currentPage+1)*pagesize);
      
      page.map((wedding : IWedding, index) => (
        elements[index] = <Wedding key={wedding.id} id={wedding.id} value={wedding}/>          
      ));
      count = page.length;
    }
    
    if(weddings.length > currentPage*pagesize)
      while(count < currentPage*pagesize){
        console.log(currentPage*pagesize)
        elements[weddings.length+count] = <li className='wedding-list-item' key={`filler-${count}`}>Filler</li>
        count++;
      }
    return elements;
  }

  function onPageClick(e: any)  {
    setCurrentPage(e.target.innerHTML);
  }

  function addTabnumbers(){
    var antallTabs = Math.ceil(weddings.length / pagesize);
    var tabs : JSX.Element[] = [];
    for (let i = 0; i < antallTabs; i++) {
      tabs[i] = <label className='wedding-tab' id={i.toString()} key={i} onClick={onPageClick}>{i}</label> 
      
    }

    return tabs;
  }

  return (
    <>
      <ul>
        {renderWeddings()}    
      </ul>
      <div id='wedding-tabs'>
        {addTabnumbers()}
      </div>
    </>
  )
}

export default Weddinglist