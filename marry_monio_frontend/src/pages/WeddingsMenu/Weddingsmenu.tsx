import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks'
import { getAllWeddings, selectWeddings } from '../../redux/slices/weddingsSlice'
import { IWedding } from '../../models/IWedding'
import './weddingsmenu.sass'
import { store } from '../../redux/store'
import { setWedding } from '../../redux/slices/weddingSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import PathConstants from '../../components/route/pathConstants'
import CreateWeddingForm from '../../components/forms/create-wedding-form'

function Weddingsmenu() {
    const dispatch = useAppDispatch()

    let weddings = useAppSelector(selectWeddings);
    const navigate = useNavigate();
    


    useEffect(()=> {
        dispatch(getAllWeddings())

    }, [])
    

    function onClick(event : any) {
        var id = event?.target.id;
        id = id.split("-")[1] //Skal bare ha id biten, ikke det før -

        let selectedWedding = weddings.filter(wedding => wedding.id == id)[0]
        console.log(id + "id selected");
        if(selectedWedding != undefined){
            navigate("../" + PathConstants.Home)
            console.log("Navigated" + window.origin)
            dispatch(setWedding(selectedWedding)); //I want to select from the dict of all weddings the one with correct id
        }else
            console.log("failure to select wedding")
    }

    const Wedding = ({ value } : any) => {
        const {description, id, dresscode} = value
        console.log(value);
        return <li className='wedding-list-item' id={`wedding-${id}`} onClick={onClick}>{dresscode} {description} {id}</li>
      }

    function renderWedding() {
        if(weddings.length > 0)
          return weddings.map((wedding : IWedding) => (
            <Wedding key={wedding.id} value={wedding}/>
          ));
        else
          return <li className='wedding-list-item'></li>
      };

    return (
        <div>
            <p>Weddingsmenu</p>
            <ul>
                {renderWedding()}
            </ul>
            <CreateWeddingForm></CreateWeddingForm>
        </div>

    )
}

export default Weddingsmenu