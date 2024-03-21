import { useState } from "react";
import styles from "./ChatMessage.module.css";

import { Link } from "react-router-dom";
export function ChatMessage({ message, setMessageToReplyTo }) {
  const DEFAULT_PROFILE_PIC_PATH = "../../../../defaultProfilePic";

  // message author username and profile image.
  // message text
  // sent when (few minutes ago, a day ago)
  // if the message is a reply, then one line of the message that it is replying to, above.
  // if hovering, then buttons to allow reply.

  const profilePicPath = message.author.profilePicURL
    ? message.author.profilePicURL
    : DEFAULT_PROFILE_PIC_PATH;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <section className={styles.messageWrapper}>
        <Link to={`/home/user_profile/${message.author.id}`}>
          <img
            className={styles.profilePic}
            src={profilePicPath}
            alt="Profile Pic"
          />
        </Link>
        <section
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!message.messageReplyingTo ? null : (
            <section>
              <p>{message.messageReplyingTo.author.username}</p>
              <p>{message.messageReplyingTo.text}</p>
            </section>
          )}

          <section className={styles.top}>
            <p>{message.author.username}</p>
            <p>{message.timeStampFormatted}</p>
          </section>

          <section className={styles.messageContents}>
            {message.imageURL ? (
              <img className={styles.image} src={message.imageURL} alt="" />
            ) : null}
            <p className={styles.messageText}>{message.text}</p>

            {!isHovered ? null : (
              <section className={styles.messageOptions}>
                <button onClick={() => setMessageToReplyTo(message)}>
                  Reply
                </button>
              </section>
            )}
          </section>
        </section>
      </section>
    </>
  );
}
