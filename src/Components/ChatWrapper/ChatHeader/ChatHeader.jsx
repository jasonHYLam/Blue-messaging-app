export function ChatHeader({ chatName, setShowViewFriendsModal, showViewFriendsModal, chatid, usersInChat, friendsNotInChat, setIsUpdatePending}) {
  return (

          <section>

            <h2>{chatName}</h2>

            <button onClick={() => {setShowViewFriendsModal(!showViewFriendsModal)}}>View Friends</button>
             {
              showViewFriendsModal ? <ViewFriendsModal 
                chatid={chatid}
                usersInChat={usersInChat}
                friendsNotAddedToChat={friendsNotInChat}
                setIsUpdatePending={setIsUpdatePending}
                /> : null
             }
          </section>
  )
}