export function ChatPreview() {
  return (
    <article >
        <Link to={`chats/${chat.id}`}>
            <section>
              <p>{chat.name}</p>
              <p>{chat.lastUpdated}</p>
              </section>
        </Link>
    </article>
  )
}