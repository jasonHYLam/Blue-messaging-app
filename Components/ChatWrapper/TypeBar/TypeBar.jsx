import styles from './TypeBar.module.css'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export function TypeBar( { setIsUpdatePending, messageToReplyTo, setMessageToReplyTo } ) {

    // console.log('checking setIsUpdatePending prop in TypeBar')
    // console.log(setIsUpdatePending)
    const {chatId} = useParams();
    // console.log('checking params')
    // console.log(chatId)
    const [ imageToUpload, setImageToUpload ] = useState(null);

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    function selectImageToUpload(e) {
        setImageToUpload(e.target.files[0]);
    }

    async function postMessage(messageObject) {


        // after this, probably need to reset imageToUpload to null
        if (imageToUpload) {

            const data = new FormData();
            data.append('image', imageToUpload)
            data.append('message', messageObject.message)

            await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/chat/${chatId}/create_message_with_image`, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    // "Content-Type" : "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
                body: data,
            })

        }

        else {

            await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/chat/${chatId}/create_message`, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type" : "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(messageObject),
            })

        }

        reset();
        setIsUpdatePending(true);

    }

    return (
        <>
        <section className={styles.typeBar}>
            <form encType="multipart/form-data" onSubmit={handleSubmit(postMessage)}>
                <input type="file" onChange={selectImageToUpload} />
                <input type="text" {...register("message", {required: true})} />
                <input type="submit"/>
            </form>
        </section>
        </>
    )
}