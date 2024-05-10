import Header from "./Header"
import Footer from "./Footer"
import { Suspense } from 'react'
import './Layout.sass'
import ProtectedRoute from "../../pages/Auth/protectedroute"


export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <ProtectedRoute>
                    </ProtectedRoute>
                </Suspense>
            </main>
            <Footer />
        </>
    )
}