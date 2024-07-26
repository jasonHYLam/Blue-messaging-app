# Blue Messaging App

[App live](https://blue-messaging-app.netlify.app/)
[Backend Repo](https://github.com/jasonHYLam/TOP-messaging-app-backend/tree/main)

This is a fullstack messaging app based on Discord. I use Discord a lot, and was interested in recreating it from scratch; this is the result.

The frontend is built with ReactJS and JavaScript, and uses additional essential technologies including React-Router and React-Hook-Form. The backend is built with NodeJS, Express, MongoDB, Multer, Cloudinary, PassportJS, and BcryptJS.

## Usage:

Users are expected to login or signup before accessing the rest of the app. A guest account is provided for quick access.

The homepage is split into a sidebar containing existing chats, and the main content which is either a chat room, chat creation, adding friends or viewing the user profile.

The chat-previews in the sidebar contain the title of the chat, as well as a timestamp of the last message.

When creating a chat, users can only invite their friends. They can add a single member, or multiple members. Afterwards, all invited members are able to access the group chat.

Chat members are able to send messages and add images to their messages.

The app is responsive for mobile and desktop users. On both desktop and mobile, the sidebar is collapsable and expandable. On desktop, the sidebar expands to a fraction of the screen width, whereas on mobile, the sidebar fills the screen, and is subsequently minimised when interacting with it.

![blue-messaging-app1](https://github.com/user-attachments/assets/e9a514af-4347-4e19-bf22-f1d1b5729392)

## Features:

Includes image upload, adding friends, group chat creation, sending messages (with images) and responsive design.

![blue-messaging-app2](https://github.com/user-attachments/assets/cd6748f1-bf73-43bf-b4f4-d0dbda0fdb8a)
