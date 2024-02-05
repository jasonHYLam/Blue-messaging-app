import { useState } from "react";
import { useForm } from "react-hook-form";

export function TypeBar() {

    const [ message, setMessage ] = useState('');

    const {
        register,
        handleSubmit
    } = useForm();

    async function postMessage(data) {

        console.log('checking out data')
        console.log(data)
        // const dataToPost = {message};
        // console.log('checking dataToPost')
        // console.log(dataToPost)
        const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/chat/:chatid/create_message`, {
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