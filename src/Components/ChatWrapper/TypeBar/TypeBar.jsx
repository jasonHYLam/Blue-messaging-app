import styles from "./TypeBar.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchData,
  fetchDataWithImageUpload,
} from "../../../helper/helperFunctions";

const IMAGE_ICON_PATH = "../../../../image.svg";
const MESSAGE_MAX_LENGTH = 1000;

export function TypeBar({
  isUpdatePending,
  setIsUpdatePending,
  messageToReplyTo,
  setMessageToReplyTo,
  setUpdateChatsList,
  chatMessages,
  setChatMessages,
}) {
  const navigate = useNavigate;
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

  async function postMessage(messageObject) {
    setIsUpdatePending(true);
    // after this, probably need to reset imageToUpload to null
    if (imageToUpload) {
      const data = new FormData();
      data.append("image", imageToUpload);
      data.append("message", messageObject.message);
      data.append("messageToReplyTo", messageToReplyTo);

      try {
        const response = await fetchDataWithImageUpload(
          `home/chat/${chatId}/create_message_with_image`,
          "POST",
          data,
        );
        if (!response.ok) navigate("error");
      } catch (err) {
        if (err) navigate("error");
      }
    } else {
      const modifiedMessageObject = {
        message: messageObject.message,
        messageToReplyTo: messageToReplyTo,
      };

      const dataToSubmit = JSON.stringify(modifiedMessageObject);

      try {
        const response = await fetchData(
          `home/chat/${chatId}/create_message`,
          "POST",
          dataToSubmit,
        );
        if (!response.ok) navigate("error");

        const { newMessage } = await response.json();

        setChatMessages([...chatMessages, newMessage]);
      } catch (err) {
        if (err) navigate("error");
      }
    }

    reset();
    setIsUpdatePending(false);
    setUpdateChatsList(true);
  }

  return (
    <>
      <section className={styles.typeBar}>
        {!messageToReplyTo ? null : (
          <>
            <section className={styles.replyContainer}>
              <button
                className={styles.cancelReply}
                onClick={() => setMessageToReplyTo(null)}
              >
                Cancel
              </button>
              <section className={styles.messageToReplyTo}>
                <p>{messageToReplyTo.author.username}</p>
                <p>{messageToReplyTo.text}</p>
              </section>
            </section>
          </>
        )}

        {errors.message && errors.message.type === "maxLength" && (
          <span className={styles.errorMessage}>
            Max length exceeded (1000 characters)
          </span>
        )}

        <form
          className={`${styles.form} ${styles.textAndSubmit}`}
          encType="multipart/form-data"
          onSubmit={handleSubmit(postMessage)}
        >
          <label className={styles.imageUpload} htmlFor="upload">
            <img src={IMAGE_ICON_PATH} alt="" />
            <input id="upload" type="file" onChange={selectImageToUpload} />
          </label>

          <input
            className={styles.textInput}
            type="text"
            {...register("message", {
              required: true,
              maxLength: MESSAGE_MAX_LENGTH,
            })}
            placeholder="Write a message"
          />
          <input type="submit" value="Post" disabled={isUpdatePending} />
        </form>
      </section>
    </>
  );
}
