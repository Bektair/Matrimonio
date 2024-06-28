import { useState } from 'react';
import '../../_index.sass';
import './genericlist.sass';



  export interface IPropsList<P> {
    listItems : any[]
    name: string
    onclickEvent: (arg: P)=>any
    setContentFunction: (arg: P)=>string //String der ${propertyname} blir interoplata om det er en av propnames i array
    
  }

  export interface IModel {
    id: string | number
  }

function List<P extends IModel>(props : IPropsList<P> )  {
  const [pagesize] = useState(10)
  const [selectedItem, setSelectedItem] = useState<HTMLLIElement>()  
  const [currentPage, setCurrentPage] = useState(0)
  const listItems = document.getElementsByClassName('generic_list_item')


  

  //Select må ha en dispatch
  function onListItemClick(event : any) {

    var id = event?.target.id;
    id = id.split("_")[1] //Skal bare ha id biten, ikke det før - 
    let selectedItemById = props.listItems.filter(item => item.id == id)[0]
    if(selectedItemById != undefined){
      for (let index = 0; index < listItems.length; index++){
        if(listItems[index].id.includes(props.name))
          listItems[index].classList.remove('generic_list_item_focus');
      }
      event?.target.classList.add('generic_list_item_focus');
      setSelectedItem(event?.target)
      props.onclickEvent(selectedItemById); //I want to select from the dict of all weddings the one with correct id
    }else{
        console.log("failure to select " + props.name)
        
    }
  }

  const ListItem = ({ value } : any) => {
    const {id} = value || {}
    var className = 'generic_list_item'
    if(selectedItem!=undefined){
      if(selectedItem.id.split("_")[1] == id)
        className+= ' generic_list_item_focus'
    }
    var element = <li className={className} key={id} id={`${props.name}-${id}`} onClick={onListItemClick}>
    <span id={"listId_"+id}>{id}</span><span id={"listContent_"+id}>{props.setContentFunction(value)}</span></li>
    return element
  } 

  function renderList(){
    
    var elements : JSX.Element[] = [];
    var count = 0;
    if(props.listItems.length > 0){
      var page = props.listItems.slice(currentPage*pagesize, (currentPage+1)*pagesize);
      
      page.map((item : P, index) => (
        elements[index] = <ListItem key={item.id} id={item.id} value={item}/>          
      ));
      count = page.length;
      elements[0]
      
    }
    
    if(props.listItems.length > currentPage*pagesize)
      while(count < currentPage*pagesize){
        elements[props.listItems.length+count] = <li className={'generic_list_item'} key={`filler-${count}`}>Filler</li>
        count++;
      }

    
    return elements;
  }

  function onPageClick(e: any)  {
    setCurrentPage(e.target.innerHTML);
    
  }

  function addTabnumbers(){
    var antallTabs = Math.ceil(props.listItems.length / pagesize);
    var tabs : JSX.Element[] = [];
    for (let i = 0; i < antallTabs; i++) {
      var className = "generic-list-tab"
      if(currentPage!=undefined){
        if(currentPage == i)
          className+= ' generic-list-tab-focus'
      }
      tabs[i] = <label className={className} id={"tabList-" + i.toString()} key={i} onClick={onPageClick}>{i}</label> 
      
    }
    return tabs;
  }

  

  return (
    <>
      
      {props.listItems == undefined || props.listItems.length == 0 &&
      <div className='list-loader'>
      </div>}

      {props.listItems != undefined &&
        <ul className='full-generic-list'>
          {renderList()}
        </ul>
      }

      {props.listItems != undefined &&
        <div className='generic-list-tabs'>
          {addTabnumbers()}
        </div>
      }
    </>
  )
}

export default List