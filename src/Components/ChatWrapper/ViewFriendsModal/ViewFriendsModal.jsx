import { fetchData } from "../../../helper/helperFunctions"

export function ViewFriendsModal({chatid, usersInChat, friendsNotAddedToChat, setIsUpdatePending}) {

  async function addFriendToChat(chatid, userid) {
    await fetchData(`home/chat/${chatid}/add_user/${userid}`, "POST")
  }

  console.log(usersInChat)
  return (
    <>
    <p>In chat:</p>
    <ul>
      {usersInChat.map(friend => {
        return (
          <>
            <p>{friend.username}</p>
          </>
        )
      })}
    </ul>

    <p>Not In Chat:</p>
    <ul>
      {friendsNotAddedToChat.map(friend => {
        return (
          <>
            <p>{friend.username}</p>
            <button onClick={() => {
              addFriendToChat(chatid, friend.id)
              setIsUpdatePending(true)
              }}>
                Add to chat
              </button>
          </>
        )
      })}
    </ul>
    </>
  )

}