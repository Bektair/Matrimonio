import { Suspense } from 'react'
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import './Layout.sass'
import AdminSideBar from './AdminSideBar'


export default function Layout() {
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