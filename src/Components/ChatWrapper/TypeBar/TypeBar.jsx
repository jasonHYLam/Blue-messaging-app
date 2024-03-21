import styles from "./TypeBar.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  fetchData,
  fetchDataWithImageUpload,
} from "../../../helper/helperFunctions";

const IMAGE_ICON_PATH = "../../../../image.svg";

export function TypeBar({
  isUpdatePending,
  setIsUpdatePending,
  messageToReplyTo,
  setMessageToReplyTo,
  setUpdateChatsList,
}) {
  const { chatId } = useParams();
  const [imageToUpload, setImageToUpload] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function selectImageToUpload(e) {
    setImageToUpload(e.target.files[0]);
  }

  console.log("checking errors");
  console.log(errors);

  async function postMessage(messageObject) {
    // This prevents multiple uploads if the user decides to spam the send button.
    if (isUpdatePending) return;
    // after this, probably need to reset imageToUpload to null
    if (imageToUpload) {
      const data = new FormData();
      data.append("image", imageToUpload);
      data.append("message", messageObject.message);
      data.append("messageToReplyTo", messageToReplyTo);

      const response = await fetchDataWithImageUpload(
        `home/chat/${chatId}/create_message_with_image`,
        "POST",
        data,
      );
    } else {
      const modifiedMessageObject = {
        message: messageObject.message,
        messageToReplyTo: messageToReplyTo,
      };

      const dataToSubmit = JSON.stringify(modifiedMessageObject);

      const response = await fetchData(
        `home/chat/${chatId}/create_message`,
        "POST",
        dataToSubmit,
      );
    }

    reset();
    setIsUpdatePending(true);
    setUpdateChatsList(true);
  }

  return (
    <>
      <section className={styles.typeBar}>
        {!messageToReplyTo ? null : (
          <>
            <section>
              <p>{messageToReplyTo.author.username}</p>
              <p>{messageToReplyTo.text}</p>
              <button onClick={() => setMessageToReplyTo(null)}>
                Cancel reply
              </button>
            </section>
          </>
        )}

        <form
          className={styles.form}
          encType="multipart/form-data"
          onSubmit={handleSubmit(postMessage)}
        >
          <label htmlFor="upload">
            <img src={IMAGE_ICON_PATH} alt="" />
            <input id="upload" type="file" onChange={selectImageToUpload} />
          </label>

          <section className={styles.textAndSubmit}>
            <input
              className={styles.textInput}
              type="text"
              {...register("message", { required: true, maxLength: 10 })}
            />
            <input type="submit" value="Send" />
          </section>
          {errors.message && errors.message.type === "maxLength" && (
            <span>Max length exceeded (1000 characters)</span>
          )}
        </form>
      </section>
    </>
  );
}
