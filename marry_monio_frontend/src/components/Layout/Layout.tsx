import Header from "./Header"
import Footer from "./Footer"
import { Suspense } from 'react'
import './Layout.sass'
import { Outlet } from "react-router-dom"
import { Auth0Provider } from '@auth0/auth0-react';


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