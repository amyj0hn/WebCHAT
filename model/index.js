import { Users } from "./users.js";
import { Posts } from "./posts.js";
import { Collaboration } from "./collaboration.js"
import { Messages } from "./messages.js"
import { Notifications } from "./notifications.js"


const users = new Users()
const posts = new Posts()
const collaboration = new Collaboration()
const messages = new Messages()
const notifications = new Notifications()


export{
    users,
    posts,
    collaboration,
    messages,
    notifications
}