export function ViewFriendsModal({usersInChat, friendsNotAddedToChat}) {

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
          </>
        )
      })}
    </ul>
    </>
  )

}