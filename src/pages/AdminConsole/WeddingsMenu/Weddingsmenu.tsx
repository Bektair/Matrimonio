import { useEffect } from 'react'
import CreateWeddingForm from '../../../../marry_monio_frontend/src/components/forms/create-wedding-form'
import WeddingUpdate from '../../../../marry_monio_frontend/src/components/forms/weddingUpdate'
import Weddinglist from '../../../../marry_monio_frontend/src/components/lists/weddinglist'
import { useAppDispatch } from '../../../../marry_monio_frontend/src/redux/Hooks/hooks'
import { getAllWeddings } from '../../../../marry_monio_frontend/src/redux/slices/weddingsSlice'
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