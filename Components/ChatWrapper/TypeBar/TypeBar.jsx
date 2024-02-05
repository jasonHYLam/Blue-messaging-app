import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export function TypeBar() {

    const [ message, setMessage ] = useState('');

    const {chatId} = useParams();
    console.log('checking params')
    console.log(chatId)

    const {
        register,
        handleSubmit
    } = useForm();

    async function postMessage(data) {


        // somehow i need to pass the chat Id to replace :chatid
        const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/chat/${chatId}/create_message`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(data),
        })
    }

    return (
        <>
        <form onSubmit={handleSubmit(postMessage)}>
            {/* <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/> */}
            <input type="text" {...register("message", {required: true})} />
            <input type="submit"/>
        </form>
        </>
    )
}