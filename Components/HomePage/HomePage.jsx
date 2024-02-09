import styles from './HomePage.module.css'

import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { Sidebar } from "../Sidebar/Sidebar"
import { Header } from "../Header/Header"

export function HomePage() {

    // create fetch request for req.user. 
    // useEffect(() => {
    //     fetch(`${ import.meta.env.VITE_BACKEND_URL }`)
    // })
    // create fetch request for req.isAuthenticated. If not, then redirect. Perhaps add this to the route beforehand.
    // needs a check for user authorization. Redirect to login page if not logged in.
    // requires state logic to see if logged in. Perhaps on this component, or the parent component (PageLayout)
    // HomePage contains Sidebar.
    // contains chatWrapper and userProfileWrapper

    // Will need to add an "Add friend" component and "users online" button.
    return (
        <>
        <main className={styles.homePage}>
            < Header />
            <section className={styles.belowHeader}>
                < Sidebar />
                < Outlet />
            </section>
        </main>


        </>
    )
}