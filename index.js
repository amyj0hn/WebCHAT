// Imports
import cors from  'cors';
import { userRouter, express } from "./controller/userController.js"
import { postRouter } from "./controller/postsController.js"
import { msgRouter } from "./controller/messagesController.js"
import { notificationRouter } from "./controller/notificationsController.js"
import { collabRouter } from './controller/collabController.js';
import { errorHandling } from './middleware/ErrorHandling.js';
import path from "path";

// Create an express app
const app = express();
const port = +process.env.PORT || 4000;

// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next()
})

app.use(
    express.static("./static"),
    express.json(),
    express.urlencoded({
        extended:true
    }),
    cors()
)

// Routes
app.use('/Users', userRouter)
app.use('/Posts', postRouter)
app.use('/Messages', msgRouter)
app.use('/Notifications', notificationRouter)
app.use('/Collaborations',  collabRouter)



// Endpoint
app.get("^/$|/WebCHAT", (req, res)=>{
    res.status(200).sendFile(path.resolve("./static/html/index.html"))
})

// any endpoint that we did not create will return this.
app.get('*', (req, res) => {        
    res.json({
      status: 404,
      msg: 'Resource not found'
    })
  })
app.use(errorHandling)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
