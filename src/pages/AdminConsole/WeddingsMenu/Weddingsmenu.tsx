import { useEffect } from 'react'
import CreateWeddingForm from '../../../components/forms/create-wedding-form'
import WeddingUpdate from '../../../components/forms/weddingUpdate'
import { useAppDispatch } from '../../../redux/Hooks/hooks'
import { getAllWeddings } from '../../../redux/slices/weddingsSlice'

import WeddingList from '../../../components/lists/WeddingList'
import './weddingsmenu.sass'
import { selectWeddings } from '../../../redux/selectors/selectWeddingsSlice'
import { useSelector } from 'react-redux'

function Weddingsmenu() {
    const dispatch = useAppDispatch();
    const weddings = useSelector(selectWeddings);

    useEffect(()=> {
       setTimeout(function() {dispatch(getAllWeddings());}, 10)
 

    }, [])
    
    /*
        id: number,
        description: string,
        dresscode: string,
        primaryColor: string,
        secoundaryColor: string
        backgroundImage: string
        primaryFontColor: string | undefined
        secoundaryFontColor: string | undefined
        bodyFont: string | undefined
        headingFont: string | undefined
        title: string
        picture: string
https://res.cloudinary.com/dgegmm2pt/image/upload/v1719230405/409904963_3600451846866566_9187057470133906523_n_dmkcnl.jpg
        
    */

    return (
        <div>
            <h1>Weddingsmenu</h1>
            <button onClick={function() {dispatch(getAllWeddings())}}>clickme</button>
            <WeddingList weddings={weddings}></WeddingList>
            <CreateWeddingForm></CreateWeddingForm>
            <WeddingUpdate></WeddingUpdate>
        </div>

    )
}

export default Weddingsmenu