import { Suspense, useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import './Layout.sass'
import AdminSideBar from './AdminSideBar'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks'
import { selectWeddings } from '../../redux/selectors/selectWeddingsSlice'
import { selectAuth } from '../../redux/selectors/selectAuth'
import { selectLanguage } from '../../redux/selectors/selectLanguage'
import { resetAllButWedding, setWedding } from '../../redux/slices/weddingSlice'
import { getUserByEmailThunk } from '../../redux/slices/authSlice'
import { getWeddingsByParticipant } from '../../redux/slices/weddingsSlice'
import { selectWedding } from '../../redux/selectors/selectWeddingSlice'


export default function Layout() {
    const weddings = useAppSelector(selectWeddings)
    const wedding = useAppSelector(selectWedding)
    const dispatch = useAppDispatch();
    const { dbId } = useAppSelector(selectAuth);
    const language = useAppSelector(selectLanguage).language;
  
    useEffect(()=>{
        
        if(!wedding){
            console.log("WEDDING EXSISTS")
            if(weddings.length > 0){
                dispatch(setWedding({
                    wedding: weddings[0], 
                }));
                dispatch(resetAllButWedding())
            }
            else{
                if(dbId)
                dispatch(getWeddingsByParticipant({participantId: dbId, language: language}));
                else
                dispatch(getUserByEmailThunk());
            } 
        }
    }, [weddings, dbId])



    return (
        <>
            <Header />
            <main>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet></Outlet>
                    </Suspense>
            </main>
            {
                process.env.NODE_ENV === 'development' &&
                <AdminSideBar></AdminSideBar>
            }
            <Footer />
        </>
    )
}