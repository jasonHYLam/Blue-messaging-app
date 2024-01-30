import styles from './Sidebar.module.css';

export function Sidebar() {

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/get_all_chats`)
            const data = response.json();
            console.log('checking data')
            console.log(data)
        }

        fetchData()
    }, [])
    // to store list of chatLinks
    // should make fetch request to get all chats, perhaps updated by time (most recently accessed at the top)
    // so perhaps each chat should have a lastUpdated field. When making a comment, update this field.
    // requires useState and useEffect frankly
    // perhaps the chat should also have a field for the number of members.
    return (
        <>
        <p>It's me, the sidebar</p>
        </>
    )
}