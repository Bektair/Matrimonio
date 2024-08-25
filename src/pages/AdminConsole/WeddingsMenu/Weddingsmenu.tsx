import { useEffect } from 'react'
import CreateWeddingForm from '../../../components/forms/create-wedding-form'
import WeddingUpdate from '../../../components/forms/weddingUpdate'
import { useAppDispatch } from '../../../redux/Hooks/hooks'
import { getAllWeddings } from '../../../redux/slices/weddingsSlice'

import WeddingList from '../../../components/lists/WeddingList'
import './weddingsmenu.sass'
import { selectWeddings } from '../../../redux/selectors/selectWeddingsSlice'
import { useSelector } from 'react-redux'
import { selectLanguage } from '../../../redux/selectors/selectLanguage'

function Weddingsmenu() {
    const dispatch = useAppDispatch();
    const weddings = useSelector(selectWeddings);
    const language = useSelector(selectLanguage).language;

    useEffect(()=> {
       setTimeout(function() {dispatch(getAllWeddings(language));}, 10)
 

    }, [])


    return (
        <div>
            <h1>Weddingsmenu</h1>
            <button onClick={function() {dispatch(getAllWeddings(language))}}>clickme</button>
            <WeddingList weddings={weddings}></WeddingList>
            <div></div>
            <CreateWeddingForm></CreateWeddingForm>
            <WeddingUpdate></WeddingUpdate>
        </div>

    )
}

export default Weddingsmenu