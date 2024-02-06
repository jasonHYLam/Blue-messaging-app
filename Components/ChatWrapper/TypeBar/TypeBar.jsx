import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export function TypeBar( {setIsUpdatePending} ) {

    // console.log('checking setIsUpdatePending prop in TypeBar')
    // console.log(setIsUpdatePending)
    const {chatId} = useParams();
    // console.log('checking params')
    // console.log(chatId)

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    async function postMessage(data) {

        await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/chat/${chatId}/create_message`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(data),
        })

        reset();
        // This is required to update the chat messages.
        // Not working for some reason. Promise is pending...
        console.log('updatePending TO BE set to true')
        setIsUpdatePending(true);
        console.log('updatePending set to true')
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