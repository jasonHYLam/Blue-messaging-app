import { useState } from "react";

export function TypeBar() {

    const [ message, setMessage ] = useState('');

    async function postMessage() {

        const dataToPost = {message};
        console.log('checking dataToPost')
        console.log(dataToPost)
        // const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/chat/:chatid/create_message`, {
        //     method: "POST",
        //     mode: "cors",
        //     credentials: "include",
        //     headers: {
        //         "Content-Type" : "application/json",
        //         "Access-Control-Allow-Credentials": true,
        //     },
        //     body: JSON.stringify(dataToPost),
        // })
    }

    return (
        <>
        <form onSubmit={(e) => {
            e.preventDefault()
            postMessage()
            }}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <input type="submit"/>
        </form>
        </>
    )
}