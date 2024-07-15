import styles from "./ChatPreview.module.css";
import { Link } from "react-router-dom";

export function ChatPreview({ chat, isMobileView, setIsSidebarMinimised }) {
  return (
    <article
      className={styles.chatPreview}
      onClick={() => {
        if (isMobileView) setIsSidebarMinimised(true);
      }}
    >
      <Link to={`chats/${chat.id}`}>
        <section>
          <p className={styles.title}>{chat.name}</p>
          <p className={`${styles.lastUpdated}`}>{chat.lastUpdatedFormatted}</p>
        </section>
      </Link>
    </article>
  );
}
