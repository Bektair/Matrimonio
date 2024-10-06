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
import { getCeremony, getReception, getRSVPbyWedding, resetAllButWedding, setWedding } from '../../redux/slices/weddingSlice'
import { getUserByEmailThunk } from '../../redux/slices/authSlice'
import { getAllWeddings, getWeddingsByParticipant } from '../../redux/slices/weddingsSlice'
import { selectWedding } from '../../redux/selectors/selectWeddingSlice'


export default function Layout() {
    const weddings = useAppSelector(selectWeddings)
    const wedding = useAppSelector(selectWedding)
    const dispatch = useAppDispatch();
    const { dbId, id } = useAppSelector(selectAuth);
    const language = useAppSelector(selectLanguage).language;
  
    useEffect(()=>{
        console.log(wedding)
        if(!wedding){
            console.log("WEDDING EXSISTS")
            console.log(weddings)
            if(weddings.length > 0){
                dispatch(setWedding({
                    wedding: weddings[0], 
                }));
                dispatch(getCeremony({weddingId: weddings[0].id.toString(), language: weddings[0].language}))
                dispatch(getReception({weddingId: weddings[0].id.toString(), language: weddings[0].language}))
                dispatch(getRSVPbyWedding({weddingId: weddings[0].id.toString(), language: weddings[0].language}))
            }
            else{
                console.log("ID---------------------")
                console.log(dbId)
                console.log(id)
                if((dbId || id) && weddings.length == 0){
                    console.log("Wedding")
                    dispatch(getAllWeddings(language));
                }
                else
                    dispatch(getUserByEmailThunk());
            } 
        }
    }, [wedding, weddings, dbId, id])



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