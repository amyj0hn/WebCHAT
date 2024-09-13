import { Users } from "./users.js";
import { Posts } from "./posts.js";
import { Collaboration } from "./collaboration.js"
import { Messages } from "./messages.js"
import { Comments } from "./comments.js"


const users = new Users()
const posts = new Posts()
const collaboration = new Collaboration()
const messages = new Messages()
const comments = new Comments()


export{
    users,
    posts,
    collaboration,
    messages,
    comments
}