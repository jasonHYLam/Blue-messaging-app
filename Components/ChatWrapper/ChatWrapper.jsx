import { useState } from "react"
import { TypeBar } from "./TypeBar/TypeBar"

export function ChatWrapper() {


    // rendered in HomePage component
    // needs to make fetch request, requires .env variable and credentials.
    // should return list of messages, that are ordered by time sent regardless of sender.

    // so, the mongoose query should be:
    // find the comments that match the chat ID. sort them by time.

    // this'll return a list of message objects. 
    // perhaps limit this to the 50 most recent comments.
    // Need to convert these into chatMessage Components
    // perhaps on each message, there are several options that I can do, for example reply to it or react.


    // need a input component. perhaps make it not overflow.
    // need a button to add image file.
    const [ isUpdatePending, setIsUpdatePending ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        setIsLoaded(true)

    })

    useEffect(() => {
        async function fetchMessages() {
        }
        fetchMessages();

        setIsUpdatePending(false);
    }, [isUpdatePending])
    return (
        !isLoaded ? <p>Loading</p> :
        <>
        <section>
            <p>It's me, the chat</p>
            < TypeBar />
        </section>
        </>
    )

}