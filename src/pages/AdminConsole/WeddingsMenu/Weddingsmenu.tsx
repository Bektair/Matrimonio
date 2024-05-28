import { useEffect } from 'react'
import CreateWeddingForm from '../../../../../forms/create-wedding-form'
import WeddingUpdate from '../../../../../forms/weddingUpdate'
import Weddinglist from '../../../components/lists/weddinglist'
import { useAppDispatch } from '../../../redux/Hooks/hooks'
import { getAllWeddings } from '../../../redux/slices/weddingsSlice'
import './weddingsmenu.sass'

function Weddingsmenu() {
    const dispatch = useAppDispatch();
  


    useEffect(()=> {
       

        

    }, [])
    
    




    return (
        <div>
            <h1>Weddingsmenu</h1>
            <button onClick={function() {dispatch(getAllWeddings())}}>clickme</button>
            <Weddinglist></Weddinglist>
            <CreateWeddingForm></CreateWeddingForm>
            <WeddingUpdate></WeddingUpdate>
        </div>

    )
}

export default Weddingsmenu