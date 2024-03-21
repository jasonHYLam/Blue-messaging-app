import styles from "./ChatPreview.module.css";
import { Link } from "react-router-dom";

export function ChatPreview({ chat }) {
  return (
    <article className={styles.chatPreview}>
      <Link to={`chats/${chat.id}`}>
        <section>
          <p className={styles.title}>{chat.name}</p>
          <p className={styles.lastUpdated}>{chat.lastUpdatedFormatted}</p>
        </section>
      </Link>
    </article>
  );
}
