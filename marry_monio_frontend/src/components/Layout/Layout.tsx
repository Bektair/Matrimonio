import Header from "./Header"
import Footer from "./Footer"
import { Suspense, useEffect } from 'react'
import './Layout.sass'
import { Outlet } from "react-router-dom"


export default function Layout() {



    return (
        <>
            <Header />
            <main>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet></Outlet>
                    </Suspense>
            </main>
            <Footer />
        </>
    )
}