import { useEffect } from 'react'
import CreateWeddingForm from '../../../components/forms/create-wedding-form'
import WeddingUpdate from '../../../components/forms/weddingUpdate'
import Weddinglist from '../../../components/lists/weddinglist'
import { useAppDispatch } from '../../../redux/Hooks/hooks'
import { getAllWeddings } from '../../../redux/slices/weddingsSlice'
import './weddingsmenu.sass'

function Weddingsmenu() {
    const dispatch = useAppDispatch()


    useEffect(()=> {
        dispatch(getAllWeddings())
    }, [])
    
    




    return (
        <div>
            <h1>Weddingsmenu</h1>
            <Weddinglist></Weddinglist>
            <CreateWeddingForm></CreateWeddingForm>
            <WeddingUpdate></WeddingUpdate>
        </div>

    )
}

export default Weddingsmenu