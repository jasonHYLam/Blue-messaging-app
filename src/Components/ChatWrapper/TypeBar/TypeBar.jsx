import styles from './TypeBar.module.css'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { fetchData, fetchDataWithImageUpload } from '../../../helper/helperFunctions';

export function TypeBar( { 
  isUpdatePending,
  setIsUpdatePending, 
  messageToReplyTo, 
  setMessageToReplyTo,
  setUpdateChatsList,
 } ) {

    const {chatId} = useParams();
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
            data.append('messageToReplyTo', messageToReplyTo)

            const response = await fetchDataWithImageUpload(`home/chat/${chatId}/create_message_with_image`, "POST", data)
        }

        else {

            const modifiedMessageObject = {
                message: messageObject.message,
                messageToReplyTo: messageToReplyTo,
            }

            const dataToSubmit = JSON.stringify(modifiedMessageObject);

            const response = await fetchData(`home/chat/${chatId}/create_message`, "POST", dataToSubmit);
        }

        reset();
        setIsUpdatePending(true);
        setUpdateChatsList(true);

        setIsBeingSubmitted(true);

    }

    return (
        <>
        <section className={styles.typeBar}>

            {!messageToReplyTo ? null : 
            <>
            <section>
                <p>{messageToReplyTo.author.username}</p>
                <p>{messageToReplyTo.text}</p>
                <button onClick={() => setMessageToReplyTo(null)}>Cancel reply</button>
            </section>
            </>
            }

            <form className={styles.form} encType="multipart/form-data" onSubmit={handleSubmit(postMessage)}>
                <input type="file" onChange={selectImageToUpload} />
                <input type="text" {...register("message", {required: true})} />
                {isUpdatePending ? <input disabled="true" type="submit"/> : <input type="submit"/> }
            </form>
        </section>
        </>
    )
}