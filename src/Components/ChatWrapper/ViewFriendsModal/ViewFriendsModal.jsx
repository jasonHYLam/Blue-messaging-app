export function ViewFriendsModal({friendsList}) {

  console.log(friendsList)
  return (
    <>
    <p>In chat:</p>
    <ul>
      {friendsList.map(friend => {
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