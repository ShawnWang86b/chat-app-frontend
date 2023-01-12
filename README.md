### Description

This project is a chat app V1, which includes most of the functionalities of modern instance chat app, e.g. wechat.\
[Project Demo Click This](https://shawns-chat-app-frontend.onrender.com)

### Main Features

**Auth**: sign in, sign up.\
**1 on 1 chat**: create room, send messages, receive messages, render messages, check sender info, check receiver info.\
**Group chat**: create room, add users, delete users, leave group, update group chat name.\
**search**: search user

### Technical stack

1. Create-React-App
2. UI Library: Chakra UI
3. Router: React-router-dom@5
4. Data fetch tool : Axios
5. Socket.io-client
6. Lotties (not success)
7. react-scrollable-feed (not success due to old version)
8. react icon & chakra icon
9. Cloudinary (the image upload to Cloudinary)
10. Google font Poppins, Light 300

### Getting Started

**Installation**\
`npm i`

**Sign up Cloudinary**\
After log in, in the `Dashboard`, you can find `Cloud Name`, which is a bunch of letters. For example `dzfmstxjw`.\
then create a `.env` in the root directory (same level as `src` folder)
add a `REACT_APP_CLOUDINARY_CLOUD_NAME ="Cloud Name"`.\
if you're running the program, need to restart the project to make .env available.

**Add Proxy**\
This one's purpose is : back-end program occupied http://127.0.0.1:5000, we don't need repeat this URL when every time fetch data from it.\
Open package.json folder, add `"proxy": "http://127.0.0.1:5000"` behind the `"private":true` ( this one should in the 4th line ).\
Running the back-end program first.\

**Change Base URL**\
In the `config` folder, `axios.js` file, comment the second one, and uncomment the `localhost:5000` one, like this:

```js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  //baseURL: "https://shawns-chat-app-api.onrender.com",
});

export default instance;
```

**Start the program**\
`npm run start`

### Plan to Improved in V2

**Structure**

1. rewrite by TS
2. refactor the Axios get and post method, too many repeat code, such as config
3. some file lines too much, need to refactor, such as singleChat.js
4. some method of ChatLogic.js should rewrite, which can cause some login bugs
5. rewrite UI in some pages

**New Features**

1. users can send image (folders if possible), better draggable.
2. show users state (green point online, red point off line)
3. chat message need to show send time
4. video, may use WebRTC
5. notifications, this should be finished in V1 but failed
6. find a new library to replace `react-scrollable-feed` and `Lotties-react`.\
7. add a read and unread mark for every message, actually not necessary just for learning purpose.
8. users may have a button to check all media file, for example, others send image and file.
9. add dark and light theme

### What have done so far

**Global**

1. installed ts, jest, react-test-library.\

**Auth-SignUp**\

1. add Regex for register input
2. add Ref, tip when focus the input
3. add feedback icon x,✓ when input
