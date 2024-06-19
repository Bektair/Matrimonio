import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateWeddingForm from '../../../components/forms/create-wedding-form'
import WeddingUpdate from '../../../components/forms/weddingUpdate'
import List from '../../../components/lists/genericlist'
import PathConstants from '../../../components/route/pathConstants'
import { IWedding } from '../../../models/IWedding'
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks/hooks'
import { setWedding } from '../../../redux/slices/weddingSlice'
import { getAllWeddings } from '../../../redux/slices/weddingsSlice'

import './weddingsmenu.sass'
import { selectWeddings } from '../../../redux/selectors/selectWeddingsSlice'

function Weddingsmenu() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let weddings = useAppSelector(selectWeddings);

    useEffect(()=> {
       setTimeout(function() {dispatch(getAllWeddings());}, 10)
       console.log("RERENDERED :(")
       console.log("NODEENV" + process.env.NODE_ENV)


    }, [])
    
    

    function onClickEvent(selectedItem: IWedding) {
        navigate("../" + PathConstants.Home)
        dispatch(setWedding(selectedItem));
    }


    return (
        <div>
            <h1>Weddingsmenu</h1>
            <button onClick={function() {dispatch(getAllWeddings())}}>clickme</button>
            <List<IWedding> onclickEvent={onClickEvent} listItems={weddings} propNames={["id", "dresscode", "description"] } 
                listItemFormat='${id} ${dresscode} ${description} nice' name='wedding'></List>
            <CreateWeddingForm></CreateWeddingForm>
            <WeddingUpdate></WeddingUpdate>
        </div>

    )
}

export default Weddingsmenu